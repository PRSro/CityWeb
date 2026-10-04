import { applyReactInVue } from 'veaury'

// 1. Import raw React components from Watermelon
import Auth10Component from '#/components/ui/auth-10'
import { AccordionApp as AccordionComponent } from '#/components/card-split-accordian'

// 2. Convert & Export as standard Vue components
export const AuthScreen = applyReactInVue(Auth10Component)
export const CardAccordion = applyReactInVue(AccordionComponent)
