import { DependencyManager } from "../dependencyManager"
import getUserRoutes from "../modules/users/infrastructure/routes/UserRoutes"
import getIncreaseRateRoutes from "../modules/increaseRate/infrastructure/routes/IncreaseRateRoutes"
import getWalletRoutes from "../modules/wallet/infrastructure/routes/WalletRoutes"
import getAccountRoutes from "../modules/account/infrastructure/routes/AccountRoutes"
import getCardRoutes from "../modules/card/infrastructure/routes/CardRoutes"
import getGastoRoutes from "../modules/gasto/infrastructure/routes/GastoRoutes"
import getPaymentMethodRoutes from "../modules/paymentMethod/infrastructure/routes/PaymentMethodRoutes"
import getRevenueRoutes from "../modules/revenue/infrastructure/routes/RevenueRoutes"
import getSubscriptionRoutes from "../modules/subscription/infrastructure/routes/SubscriptionRoutes"

const prefix = '/api/v1'
const ReduceRouters = (app: { use: (arg0: string, arg1: any) => void }, dependencyManager: DependencyManager) => {
    app.use(prefix, getUserRoutes(dependencyManager))
    app.use(prefix, getIncreaseRateRoutes(dependencyManager))
    app.use(prefix, getWalletRoutes(dependencyManager))
    app.use(prefix, getAccountRoutes(dependencyManager))
    app.use(prefix, getCardRoutes(dependencyManager))
    app.use(prefix, getGastoRoutes(dependencyManager))
    app.use(prefix, getPaymentMethodRoutes(dependencyManager))
    app.use(prefix, getRevenueRoutes(dependencyManager))
    app.use(prefix, getSubscriptionRoutes(dependencyManager))
}

export default ReduceRouters