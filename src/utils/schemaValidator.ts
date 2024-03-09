import { TypedConfigModuleOptions } from 'nest-typed-config'
import { AppConfig } from '@/app.config'

export const schemeValidator: TypedConfigModuleOptions['validate'] = (
  config: AppConfig,
) => {
  return config
}
