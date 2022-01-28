import BalanceCard from '../components/CardBalance'
import Footer from '../components/Footer'
import HistoryComponent from '../components/History'
import NewOperationComponent from '../components/newOperation'
import { OperationsType } from '../lib/types'

export default function Home({ operations }: OperationsType) {
  return (
    <>
      <div className="h-full overflow-x-auto lg:grid lg:grid-cols-2 lg:h-screen lg:w-screen">
        <div className="p-5 flex justify-center items-center lg:col-start-1">
          <BalanceCard operations={operations} />
        </div>
        <div className="p-5 flex justify-center items-center lg:col-start-1">
          <NewOperationComponent />
        </div>
        <div className="p-5 max-w-xl flex justify-center items-center lg:col-start-2 lg:row-start-1 lg:row-end-3">
          <HistoryComponent operations={operations} />
        </div>
        <div className="w-screen lg:absolute lg:bottom-0">
          <Footer />
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const res = await fetch(
      'https://alkemy-challenge-2022-git-basic-presentation-hugovenega.vercel.app/api/historyOperations.controller'
    )
    const data = await res.json()
    return {
      props: { operations: { data } },
    }
  } catch (error) {
    console.log({ error })
    return {
      props: { operations: { data: { getUserOperations: [] } } },
    }
  }
}
