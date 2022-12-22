import Head from "next/head"
import styles from "../styles/Home.module.css"
import TopBar from "../components/TopBar"
import QuestionTable from "../components/QuestionTable"
import SearchBox from "../components/SearchBox"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getQuestions } from "../redux/actions/questionActions"

export default function Home() {
  const [currentId, setCurrentId] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getQuestions())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <Head>
        <title>FAQ manager</title>
        <meta name="description" content="FAQ Manager" />
      </Head>

      <main className={styles.main}>
        <TopBar currentId={currentId} setCurrentId={setCurrentId} />
        <SearchBox />
        <QuestionTable setCurrentId={setCurrentId} />
      </main>
      <Footer />
    </div>
  )
}

// export async function getServerSideProps() {

//   // Fetch data from external API
//   const res = await fetch(`http://localhost:5000/`)
//   const data = await res.json()

//   // Pass data to the page via props
//   return {
//     props: {
//       results:data,
//     },
//   }
// }
