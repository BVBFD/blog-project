import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./classicEastern.module.css";
import { useRef } from "react/cjs/react.development";

const ClassicEastern = ({ classicEastern }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  const initialCodes = `
    <div>
      ${classicEastern[classicEastern.length - 1].contents}
    </div>`;

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{classicEastern[classicEastern.length - 1].type}</h1>
            <h2>{classicEastern[classicEastern.length - 1].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}
      {Object.keys(classicEastern)
        .reverse()
        .map((key) => {
          const testStr = classicEastern[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${classicEastern[key].type}</h1>
                <h2>${classicEastern[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/classicEastern/${classicEastern[key].id}`}>
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
        {Object.keys(classicEastern)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/classicEastern/${classicEastern[key].id}`}
                >
                  <h4>{classicEastern[key].id}.&emsp;</h4>
                  <h4>{classicEastern[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{classicEastern[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default ClassicEastern;
