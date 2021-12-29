import { EdgeType }  from "./";


export interface IMermaidNode {
    id: string;
    text: string;
    link: string | Array<string> | undefined;
    next: Array<string>;
    editable: boolean;
    group: string | undefined;
    style: string | undefined;
    url: string | undefined;
    /**连线样式 */
    linkStyle: string | undefined;
    /**连线对应的next 索引位置 ， */
    linkNumber: number | undefined;
    edgeType: EdgeType;
}
