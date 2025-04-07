import { ImageComponent } from "./image"
import { ButtonComponent } from "./button"
import { LabelComponent } from "./label"

type ComponentsMap = {
    [key: string]: (def: any) => React.JSX.Element
}

const componentMap: ComponentsMap = {
    button: ButtonComponent,
    label: LabelComponent,
    image: ImageComponent,
}

export default componentMap