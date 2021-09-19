
import { IEdgeRender } from "../types/IEdgeRender"
import { AlignType } from "../types/AlignType"
import { IMermaidNode } from "../types/IMermaidNode"
import { EdgeType } from "../types"
import { MermaidNode } from "../types/MermaidNode";


export const edges = [
    { type: EdgeType.default, open: "[", close: "]" } as IEdgeRender,
    { type: EdgeType.round, open: "(", close: ")" } as IEdgeRender,
    { type: EdgeType.stadium, open: "([", close: "])" } as IEdgeRender,
    { type: EdgeType.subroutine, open: "[[", close: "]]" } as IEdgeRender,
    { type: EdgeType.cylindrical, open: "[(", close: ")]" } as IEdgeRender,
    { type: EdgeType.circle, open: "((", close: "))" } as IEdgeRender,
    { type: EdgeType.asymetric, open: ">", close: "]" } as IEdgeRender,
    { type: EdgeType.rhombus, open: "{", close: "}" } as IEdgeRender,
    { type: EdgeType.hexagon, open: "{{", close: "}}" } as IEdgeRender,
    { type: EdgeType.parallelogram, open: "[/", close: "/]" } as IEdgeRender,
    { type: EdgeType.parallelogram_alt, open: "[\\", close: "\\]" } as IEdgeRender,
    { type: EdgeType.trapezoid, open: "[/", close: "\\]" } as IEdgeRender,
    { type: EdgeType.trapezoid_alt, open: "[\\", close: "/]" } as IEdgeRender,
]

function render(node: IMermaidNode): string {
    const edge = edges.find((e) => {
        return e.type === node.edgeType;
    }) || edges[0];
    return `${node.id}${edge.open}"${node.text}"${edge.close}`;
}

function buildLink(node: IMermaidNode, index: number): string {
    const link = "-->";
    if (node.link) {
        if (Array.isArray(node.link)) {
            if (node.link.length > index) return node.link[index];
            else return node.link[node.link.length - 1];
        } else {
            return node.link;
        }
    }
    return link;
}

export function parseCode(type: AlignType, nodes: Array<MermaidNode>, styles: Array<string> = []): string {


    if (Array.isArray(nodes) && nodes.length > 0) {
        const parseCode = GraphStype(type) + "\n";
        const groupNodes = getGroupNodes(nodes);
        const code = parseCode + groupNodes + customStyle(styles, nodes).join(" \n");
        return code;
    } else {
        return "";
    }
}
function GraphStype(type: AlignType): string {

    let typeStr = 'TD';
    switch (type) {
        case AlignType.bt:
            typeStr = 'BT'
            break;
        case AlignType.lr:
            typeStr = "LR"
            break;
        case AlignType.rl:
            typeStr = "RL"
            break;
        default:
            typeStr = "TD";
    }
    return 'graph ' + typeStr
}

function customStyle(styles: Array<string>, nodes: Array<IMermaidNode>): Array<string> {

    const nodeStyles = nodes
        .filter((node) => node.style)
        .map((node) => `style ${node.id} ${node.style}`);
    const nodeLinkStyles = nodes
        .filter((node) => node.linkStyle)
        .map(
            (node) =>
                `linkStyle ${node.linkNumber || nodes.indexOf(node)} ${node.linkStyle
                }`
        );
    return nodeStyles.concat(styles).concat(nodeLinkStyles);
}
interface IGoupSetValue {
    nids: Set<string>,
    narr: Array<IMermaidNode>
}
function getGroupNodes(nodes: Array<IMermaidNode>): string {
    const innerMap = new Map<string, IGoupSetValue>();
    nodes.forEach((element) => {
        const group = element.group || "unGroup";
        const data = innerMap.get(group) || { nids: new Set<string>(), narr: new Array<IMermaidNode>() } as IGoupSetValue;
        data.nids.add(element.id);
        data.narr.push(element);
        innerMap.set(group, data);
    });

    const result = new Array<string>();

    for (const groupName of innerMap.keys()) {
        const groupSetValue = innerMap.get(groupName);


        const narr = groupSetValue?.narr || [];
        const nids = groupSetValue?.nids || new Set<string>();

        if (groupName !== "unGroup") {
            result.push(buildGroup(groupName, narr, nids))
        }
        else {
            const nodesStr = buildNodesStr(narr);
            result.push(nodesStr);
        }
    }
    return result.join("\n")
}


function buildGroup(groupName: string, narr: Array<IMermaidNode>, nids: Set<string>) {
    const innerNodes = new Array<IMermaidNode>();
    const outNodes = new Array<IMermaidNode>();
    narr.forEach((node: IMermaidNode) => {
        if (node.next) {
            const innerNode = new MermaidNode(node.id, node.text, node.editable);
            innerNode.style = node.style;
            innerNodes.push(innerNode);

            node.next.forEach((id) => {

                const mermaidNode = new MermaidNode(node.id, node.text, node.editable);
                mermaidNode.link = node.link;
                mermaidNode.next.push(id)

                if (nids.has(id)) {
                    innerNodes.push(mermaidNode);
                } else {

                    outNodes.push(mermaidNode);
                }
            });
        } else {
            innerNodes.push(node);
        }
    });
    const innerNodesStr = buildNodesStr(innerNodes);
    const outNodeStr = buildNodesStr(outNodes);
    return `subgraph ${groupName} \n ${innerNodesStr} end \n ${outNodeStr}`;
}


function buildNodesStr(nodes: Array<MermaidNode>): string {

    const nodeObject = new Map<string, MermaidNode>();
    nodes.map(el => {
        nodeObject.set(el.id, el);
    })


    return (
        nodes
            .map((item: MermaidNode) => {
                if (item.next && item.next.length > 0) {
                    return item.next
                        .map((n, index) => {
                            const next = nodeObject.get(n)
                            if (next != null && typeof next != "undefined") {

                                return `${render(item)}${buildLink(
                                    item,
                                    index
                                )}${render(next)}`;
                            } else {
                                //TODO error
                                return `${(render(item))}`;
                            }
                        })
                        .join("\n");
                } else {
                    return `${(render(item))}`;
                }
            })
            .join("\n") +
        "\n" +
        nodes
            .filter((item) => item.editable)
            .map((item) => {
                return `click ${item.id} mermaidClick`;
            })
            .join("\n") +
        "\n" +
        nodes
            .filter((item) => item.url)
            .map((item) => {
                return `click ${item.id} "${item.url}"`;
            })
            .join("\n") +
        "\n"
    );
}
