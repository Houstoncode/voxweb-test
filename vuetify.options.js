import WorkIcon from '~/components/icons/Work'
import QuestionIcon from '~/components/icons/Question'
import ProductIcon from '~/components/icons/Product'
import LogoLetterIcon from '~/components/icons/LogoLetter'
import CheckboxCheckedIcon from '~/components/icons/CheckboxChecked'
import CheckboxIcon from '~/components/icons/Checkbox'

export default {
  theme: {
    themes: {
      light: {
        primary: '#D6073D',
        accent: '#BD0D22',
        second: '#6F849C',
        error: '#D6073D',
      },
    },
  },
  icons: {
    values: {
      work: {
        component: WorkIcon,
      },
      product: {
        component: ProductIcon,
      },
      question: {
        component: QuestionIcon,
      },
      logo: {
        component: LogoLetterIcon,
      },
      checkboxChecked: {
        component: CheckboxCheckedIcon,
      },
      checkbox: {
        component: CheckboxIcon,
      },
    },
  },
}
