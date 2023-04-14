import { Router } from 'express'
import * as invoiceCtrl from '../../controller/invoice'
import { isLoggedIn } from '../../middleware/auth'

const router = Router()

router.post('/', isLoggedIn, invoiceCtrl.add)
router.delete('/:id', isLoggedIn, invoiceCtrl.removeInvoice)
router.put('/:id', isLoggedIn, invoiceCtrl.updateInvoice)
router.put('/status/:id', isLoggedIn, invoiceCtrl.updateStatus)
router.get('/', isLoggedIn, invoiceCtrl.getAll)
router.get('/owned/', isLoggedIn, invoiceCtrl.getAllOwned)
router.get('/:id', isLoggedIn, invoiceCtrl.getOneById)

export default router
