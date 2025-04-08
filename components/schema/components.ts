import { ImageComponent } from './image'
import { ButtonComponent } from './button'
import { LabelComponent } from './label'
import { ComponentsMap } from './definition'
import { StackComponent } from './stack'
import { StatComponent } from './stat'

const componentMap: ComponentsMap = {
    button: ButtonComponent,
    label: LabelComponent,
    image: ImageComponent,
    stack: StackComponent,
    stat: StatComponent,
}

export { componentMap }
