import { DependencyManager } from "../dependencyManager"
import { UserModuleInitializer } from "./users/userModule"
import { IncreaseRateModuleInitializer } from "./increaseRate/increaseRateModule"
import { WalletModuleInitializer } from "./wallet/walletModule"
import { AccountModuleInitializer } from "./account/accountModule"
import { CardModuleInitializer } from "./card/cardModule"
import { GastoModuleInitializer } from "./gasto/gastoModule"
import { PaymentMethodModuleInitializer } from "./paymentMethod/paymentMethodModule"
import { RevenueModuleInitializer } from "./revenue/revenueModule"
import { SubscriptionModuleInitializer } from "./subscription/subscriptionModule"

// Aca debemos registrar todos los modulos que hayamos creado
const ModulesInitializer = (dependencyManager: DependencyManager) => {
    UserModuleInitializer(dependencyManager)
    IncreaseRateModuleInitializer(dependencyManager)
    WalletModuleInitializer(dependencyManager)
    AccountModuleInitializer(dependencyManager)
    CardModuleInitializer(dependencyManager)
    GastoModuleInitializer(dependencyManager)
    PaymentMethodModuleInitializer(dependencyManager)
    RevenueModuleInitializer(dependencyManager)
    SubscriptionModuleInitializer(dependencyManager)
}
export default ModulesInitializer