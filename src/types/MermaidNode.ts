import { IMermaidNode, EdgeType } from "./";


export class MermaidNode implements IMermaidNode {

    public id: string;
    public text: string;
    public link: string | Array<string> | undefined = undefined;
    public next: Array<string> = [];
    public editable: boolean;
    public group: string | undefined = undefined;
    public style: string | undefined = undefined;
    public url: string | undefined = undefined;
    /**连线样式 */
    public linkStyle: string | undefined = undefined;
    /**连线对应的next 索引位置 ， */
    public linkNumber: number | undefined = undefined;
    public edgeType: EdgeType = EdgeType.default;
    constructor(id: string, text: string, editable = false) {
        this.id = id;
        this.text = text;
        this.editable = editable;
    }



}
