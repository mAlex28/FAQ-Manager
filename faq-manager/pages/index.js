import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TopBar from "../components/TopBar"
import QuestionTable from '../components/QuestionTable'
import SearchBox from '../components/SearchBox'
import Footer from '../components/Footer'

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>FAQ manager</title>
        <meta name="description" content="FAQ Manager" />
      </Head>

      <main className={styles.main}>
        <TopBar />
        <SearchBox />
        {/* <QuestionTable result={results}/> */}
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
//       results: data,
//     },
//   }
// }



