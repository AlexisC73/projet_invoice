import { Router } from 'express'
import * as invoiceCtrl from '../../controller/invoice'
import { isLoggedIn } from '../../middleware/auth'

const router = Router()

router.post('/', invoiceCtrl.add)
router.delete('/:id', invoiceCtrl.removeInvoice)
router.get('/:id', invoiceCtrl.getOneById)
router.put('/:id', invoiceCtrl.updateInvoice)
router.put('/status/:id', invoiceCtrl.updateStatus)
router.get('/', invoiceCtrl.getAll)

export default router
