import { XmlAttributeComponent, XmlComponent } from "file/xml-components";
import { TableOfContentsProperties } from "./table-of-contents-properties";

class TextAttributes extends XmlAttributeComponent<{ space: "default" | "preserve" }> {
    protected xmlKeys = { space: "xml:space" };
}

export class TableOfContentsInstruction extends XmlComponent {
    private readonly properties: TableOfContentsProperties;

    constructor(properties?: TableOfContentsProperties) {
        super("w:instrText");
        this.properties = properties || new TableOfContentsProperties();

        this.root.push(new TextAttributes({ space: "preserve" }));
        let instruction = "TOC";
        if (this.properties.captionLabel) {
            instruction = `${instruction} \\a "${this.properties.captionLabel}"`;
        }
        if (this.properties.entriesFromBookmark) {
            instruction = `${instruction} \\b "${this.properties.entriesFromBookmark}"`;
        }
        if (this.properties.captionLabelIncludingNumbers) {
            instruction = `${instruction} \\c "${this.properties.captionLabelIncludingNumbers}"`;
        }
        if (this.properties.sequenceAndPageNumbersSeparator) {
            instruction = `${instruction} \\d "${this.properties.sequenceAndPageNumbersSeparator}"`;
        }
        if (this.properties.tcFieldIdentifier) {
            instruction = `${instruction} \\f "${this.properties.tcFieldIdentifier}"`;
        }
        if (this.properties.hiperlink) {
            instruction = `${instruction} \\h`;
        }
        if (this.properties.tcFieldLevelRange) {
            instruction = `${instruction} \\l "${this.properties.tcFieldLevelRange}`;
        }
        if (this.properties.pageNumbersEntryLevelsRange) {
            instruction = `${instruction} \\n "${this.properties.pageNumbersEntryLevelsRange}`;
        }
        if (this.properties.headingStyleRange) {
            instruction = `${instruction} \\o "${this.properties.headingStyleRange}`;
        }
        if (this.properties.entryAndPageNumberSeparator) {
            instruction = `${instruction} \\p "${this.properties.entryAndPageNumberSeparator}`;
        }
        if (this.properties.seqFieldIdentifierForPrefix) {
            instruction = `${instruction} \\s "${this.properties.seqFieldIdentifierForPrefix}`;
        }
        if (this.properties.stylesWithLevels && this.properties.stylesWithLevels.length) {
            const styles = this.properties.stylesWithLevels.map((sl) => `${sl.styleName},${sl.level}`).join(",");
            instruction = `${instruction} \\t "${styles}"`;
        }
        if (this.properties.useAppliedParagraphOutlineLevel) {
            instruction = `${instruction} \\u`;
        }
        if (this.properties.preserveTabInEntries) {
            instruction = `${instruction} \\w`;
        }
        if (this.properties.preserveNewLineInEntries) {
            instruction = `${instruction} \\x`;
        }
        if (this.properties.hideTabAndPageNumbersInWebView) {
            instruction = `${instruction} \\z`;
        }
        this.root.push(instruction);
    }
}
