#!/usr/bin/env python3
"""Embed TrueType fonts into a .pptx so they travel with the file and are
ALWAYS available on any machine (Bebas Neue, Poppins, Comfortaa).

PowerPoint reads <p:embeddedFontLst> + raw-TTF font parts (content type
application/x-fontdata). This writes exactly that — no obfuscation, which both
PowerPoint and LibreOffice accept.

Usage:
    python embed_fonts.py deck.pptx [fonts_dir] [out.pptx]

If fonts_dir is omitted it defaults to the ./fonts folder next to this script.
If out.pptx is omitted the input deck is replaced in place.
"""
import sys, os, zipfile, shutil, re

# typeface name (as written into the deck) -> {variant: ttf filename in fonts_dir}
FONT_MAP = {
    "Bebas Neue":    {"regular": "BebasNeue-Regular.ttf"},
    "Poppins":       {"regular": "Poppins-Regular.ttf", "bold": "Poppins-Bold.ttf",
                      "italic": "Poppins-Italic.ttf", "boldItalic": "Poppins-BoldItalic.ttf"},
    "Comfortaa":     {"regular": "Comfortaa-Regular.ttf", "bold": "Comfortaa-Bold.ttf"},
}
VARIANT_TAG = {"regular": "p:regular", "bold": "p:bold",
               "italic": "p:italic", "boldItalic": "p:boldItalic"}
REL_FONT = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font"


def embed(pptx_in, fonts_dir, pptx_out):
    zin = zipfile.ZipFile(pptx_in, "r")
    names = zin.namelist()
    pres = zin.read("ppt/presentation.xml").decode("utf-8")
    rels = zin.read("ppt/_rels/presentation.xml.rels").decode("utf-8")
    ctypes = zin.read("[Content_Types].xml").decode("utf-8")

    # next free rId in presentation rels
    used = [int(m) for m in re.findall(r'Id="rId(\d+)"', rels)]
    rid = max(used) + 1 if used else 1

    font_parts = []          # (partname, bytes)
    embedded_xml = []        # per-typeface <p:embeddedFont> blocks
    new_rels = []
    fidx = 1

    for typeface, variants in FONT_MAP.items():
        present = {v: f for v, f in variants.items()
                   if os.path.exists(os.path.join(fonts_dir, f))}
        if not present:
            continue
        block = ['<p:embeddedFont><p:font typeface="%s"/>' % typeface]
        for variant, fname in present.items():
            part = "ppt/fonts/font%d.fntdata" % fidx
            with open(os.path.join(fonts_dir, fname), "rb") as fh:
                font_parts.append((part, fh.read()))
            rId = "rId%d" % rid
            new_rels.append('<Relationship Id="%s" Type="%s" Target="fonts/font%d.fntdata"/>'
                            % (rId, REL_FONT, fidx))
            block.append('<%s r:id="%s"/>' % (VARIANT_TAG[variant], rId))
            rid += 1
            fidx += 1
        block.append("</p:embeddedFont>")
        embedded_xml.append("".join(block))

    if not embedded_xml:
        raise SystemExit("No font files found in %s — nothing embedded." % fonts_dir)

    # 1) presentation.xml: turn on embedding + insert the embeddedFontLst
    if "embedTrueTypeFonts" not in pres:
        pres = pres.replace("<p:presentation ", '<p:presentation embedTrueTypeFonts="1" ', 1)
    lst = "<p:embeddedFontLst>" + "".join(embedded_xml) + "</p:embeddedFontLst>"
    # correct schema position: right after notesSz, before defaultTextStyle/custShowLst
    pres = re.sub(r"(<p:notesSz[^/]*/>)", r"\1" + lst, pres, count=1)

    # 2) relationships
    rels = rels.replace("</Relationships>", "".join(new_rels) + "</Relationships>")

    # 3) content types: declare the fntdata extension
    if 'Extension="fntdata"' not in ctypes:
        ctypes = ctypes.replace(
            "</Types>",
            '<Default Extension="fntdata" ContentType="application/x-fontdata"/></Types>')

    # write fresh zip
    tmp = pptx_out + ".tmp"
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for n in names:
            if n == "ppt/presentation.xml":
                zout.writestr(n, pres)
            elif n == "ppt/_rels/presentation.xml.rels":
                zout.writestr(n, rels)
            elif n == "[Content_Types].xml":
                zout.writestr(n, ctypes)
            else:
                zout.writestr(n, zin.read(n))
        for part, data in font_parts:
            zout.writestr(part, data)
    zin.close()
    shutil.move(tmp, pptx_out)
    print("Embedded %d font file(s) for %d typeface(s) -> %s"
          % (len(font_parts), len(embedded_xml), pptx_out))


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    pptx_in = sys.argv[1]
    fonts_dir = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")
    pptx_out = sys.argv[3] if len(sys.argv) > 3 else pptx_in
    embed(pptx_in, fonts_dir, pptx_out)
