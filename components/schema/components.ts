import { ImageComponent } from './image'
import { ButtonComponent } from './button'
import { LabelComponent } from './label'
import { ComponentsMap } from './definition'
import { StackComponent } from './stack'
import { StatComponent } from './stat'
import { TextInputComponent } from '../input'

const componentMap: ComponentsMap = {
    button: ButtonComponent,
    label: LabelComponent,
    image: ImageComponent,
    stack: StackComponent,
    stat: StatComponent,
    textInput: TextInputComponent,
}

export { componentMap }
