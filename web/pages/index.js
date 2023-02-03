import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const router = useRouter();
  function select(a) {
    if (a == "custom") {
      fadeGrid();
    }
  }

  useEffect(() => {
    console.log("ping RYGB")
    const loading = document.getElementById("loading");
    axios({
      method: 'get',
      url: 'https://rygb.tech:8333/ping',
    }).then((res) => {
      console.log("Connected.");
      const anim = loading.animate({ opacity: "0" }, 500);
      anim.onfinish = () => {
        loading.style.opacity = "0";
      }
    });
  }, [router.isReady]);

  function fadeGrid() {
    const grid = document.getElementById("buttongrid");
    const anim = grid.animate({ opacity: "0" }, 500);
    anim.onfinish = () => {
      grid.style.display = "none";
    }
  }
  return (
    <>
      <Head>
        <title>Create New Work Order</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet"></link>
      </Head>
      <div id="body" className={styles.body}>
        <div id="navbar" className={styles.text}>Hang on</div>
        <div id="buttongrid" style={{ opacity: "0" }} className={styles.buttongrid}>
          <button id="custom" onClick={() => select("custom")} className={styles.cbutton}>
            +
          </button>
          <button id="custom" className={styles.cbutton}>
            Template 1
          </button>
          <button id="custom" className={styles.cbutton}>
            +
          </button>
          <button id="custom" className={styles.cbutton}>
            +
          </button>
          <button id="custom" className={styles.cbutton}>
            +
          </button>
          <button id="custom" className={styles.cbutton}>
            +
          </button>
        </div>
        <div id="loading" className={styles.circle2}></div>
        <input id="code" className={styles.input} style={{opacity: "0"}} placeholder="Authentication Code" type="tel"></input>
      </div>
    </>
  )
}
