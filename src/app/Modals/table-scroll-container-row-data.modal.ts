export class TableScrollContainerRowData{
    rowLink: string
    rowData: Array<string>
    constructor(link?: string, data?: Array<string>){
        this.rowLink = link
        this.rowData = data
    }
}