import { PrismaClient } from '@invoice/domain'
import { InvoiceRepository } from '@invoice/domain/dist/invoice/invoice.repository'
import { Invoice } from '@invoice/domain/dist/invoice'

export class PrismaInvoiceRepository implements InvoiceRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async save(invoice: Invoice): Promise<void> {
    const invoiceExists = await this.prisma.invoice.findUnique({
      where: { id: invoice.id },
    })
    if (invoiceExists) {
      await this.prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          date: invoice.date,
          dueDate: invoice.dueDate,
          description: invoice.description,
          currency: invoice.currency,
          status: invoice.status,
          contact: invoice.contact,
          owner: invoice.owner,
          sender: invoice.sender,
          buyer: {
            name: invoice.buyer.name,
            sender: invoice.buyer.address,
          },
          products: invoice.products,
        },
      })
      return Promise.resolve()
    }
    await this.prisma.invoice.create({
      data: {
        id: invoice.id,
        date: invoice.date,
        dueDate: invoice.dueDate,
        description: invoice.description,
        currency: invoice.currency,
        status: invoice.status,
        contact: invoice.contact,
        owner: invoice.owner,
        sender: invoice.sender,
        buyer: {
          name: invoice.buyer.name,
          sender: invoice.buyer.address,
        },
        products: invoice.products,
      },
    })
    return Promise.resolve()
  }
  async findById(id: string): Promise<Invoice> {
    const fund = await this.prisma.invoice.findUnique({ where: { id } })
    if (!fund) throw new Error('Invoice not found')
    return Invoice.fromData({
      id: fund.id,
      date: fund.date,
      dueDate: fund.dueDate,
      description: fund.description,
      currency: fund.currency,
      status: fund.status,
      contact: fund.contact,
      owner: fund.owner,
      sender: fund.sender,
      buyer: {
        name: fund.buyer.name,
        address: fund.buyer.sender,
      },
      products: fund.products,
    })
  }
  async delete(id: string): Promise<void> {
    await this.prisma.invoice.delete({ where: { id } })
    return Promise.resolve()
  }
  async getAll(): Promise<Invoice[]> {
    const invoices = await this.prisma.invoice.findMany()
    return invoices.map((invoice) =>
      Invoice.fromData({
        id: invoice.id,
        date: invoice.date,
        dueDate: invoice.dueDate,
        description: invoice.description,
        currency: invoice.currency,
        status: invoice.status,
        contact: invoice.contact,
        owner: invoice.owner,
        sender: invoice.sender,
        buyer: {
          name: invoice.buyer.name,
          address: invoice.buyer.sender,
        },
        products: invoice.products,
      })
    )
  }
  async getAllByUserId(userId: string): Promise<Invoice[]> {
    const invoices = await this.prisma.invoice.findMany({
      where: { owner: userId },
    })
    return invoices.map((invoice) =>
      Invoice.fromData({
        id: invoice.id,
        date: invoice.date,
        dueDate: invoice.dueDate,
        description: invoice.description,
        currency: invoice.currency,
        status: invoice.status,
        contact: invoice.contact,
        owner: invoice.owner,
        sender: invoice.sender,
        buyer: {
          name: invoice.buyer.name,
          address: invoice.buyer.sender,
        },
        products: invoice.products,
      })
    )
  }
}
