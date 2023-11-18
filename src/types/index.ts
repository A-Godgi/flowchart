export interface ChartElement {
    id: string
    title: string
    type: 'category' | 'service'
    isEditable: boolean
    children: ChartElement[] | []
}

export interface LineStyles {
    left: string
    right: string
}