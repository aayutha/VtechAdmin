import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {

  return (
    <div className={styles.homeDiv}>
      <div>Home</div>

      <div className={styles.buttonDiv}>
        <button
          onClick={() => {
            
          }}
        >
          <Link
            style={{
                textDecoration:'none',
                color:"white"
            }}
            to="/Course">Course</Link>
        </button>
        <button
          onClick={() => {
            
          }}
        >
            <Link
                style={{
                    textDecoration:'none',
                    color:"white"
                }}
            to="/Activity">Activity</Link>
        </button>
        <button
          onClick={() => {
            
          }}
        >
            <Link
                style={{
                    textDecoration:'none',
                    color:"white"
                }}
            to="/FeedBack">FeedBack</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
