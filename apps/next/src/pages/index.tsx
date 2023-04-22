import GoBackButton from '@/components/ui/GoBackButton'
import Header from '@/components/Header/Header'
import data from '@/data/invoices.json'
import FullForm from '@/components/FullForm'
import ActionButton from '@/components/ui/ActionButton'
import FormTitle from '@/components/Form/FormTitle'

export default function Home() {
  const invoice = data[0]
  return (
    <main className='flex flex-col xl:flex-row justify-center min-h-screen bg-[#F8F8FB]'>
      <Header />
      <section id='content' className='flex-1'>
        <div className='p-6 xl:p-0 xl:pt-6 w-full xl:max-w-[730px] xl:mx-auto'></div>
      </section>
      <div className='absolute xl:fixed top-[72px] sm:top-0 left-0 right-0 bg-white w-full sm:w-4/5 xl:w-[720px] xl:pt-[33px] xl:pl-[158px] sm:pl-[30px] sm:pt-[34px] sm:pr-[18px] sm:h-screen flex flex-col rounded-br-[20px] rounded-tr-[20px]'>
        <div className='sm:hidden pt-6 px-6'>
          <GoBackButton />
        </div>
        <div className='sm:pt-6 px-6 pt-0 xl:px-0'>
          <div className='mt-[20px] sm:mt-[79px] sm:pl-[1px] xl:mt-0 xl:pl-[0px]'>
            <FormTitle>
              Edit <span className='text-[#888EB0]'>#</span>
              {invoice.id}
            </FormTitle>
          </div>
        </div>
        <div className='flex-1 sm:overflow-y-scroll sm:mt-[17px] xl:mt-[40px]'>
          <FullForm invoice={invoice} />
        </div>

        <div className='flex justify-end pt-[21px] gap-[8px] pb-[22px] px-6 sm:pt-[38px] sm:pr-[40px]'>
          <ActionButton action='Cancel' type='default' />
          <ActionButton action='Save Changes' type='primary' />
        </div>
      </div>
    </main>
  )
}
