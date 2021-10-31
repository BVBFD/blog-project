import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./korean.module.css";
import { useRef } from "react/cjs/react.development";

const Korean = ({ koreans }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  const initialCodes = `
    <div>
      ${koreans[Object.keys(koreans).length].contents}
    </div>`;

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{koreans[Object.keys(koreans).length].type}</h1>
            <h2>{koreans[Object.keys(koreans).length].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}
      {Object.keys(koreans)
        .reverse()
        .map((key) => {
          const testStr = koreans[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${koreans[key].type}</h1>
                <h2>${koreans[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/korean/${key}`}>
                    <div
                      className={styles.novelUsaEuBox}
                      dangerouslySetInnerHTML={{ __html: codes }}
                    ></div>
                  </Route>
                </Switch>
              </div>
            </>
          );
        })}
      <ul className={styles.novelUsaEuDataUlBox}>
        {Object.keys(koreans)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/korean/${key}`}
                >
                  <h4>{key}.&emsp;</h4>
                  <h4>{koreans[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{koreans[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Korean;
