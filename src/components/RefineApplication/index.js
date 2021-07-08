import React, { useState } from 'react';
import { RefineResult, refine } from './logic';
import './index.css';
import RoxLogo from '../../assets/rox_logo.png';

function RefineApplication() {
  const [baseLv, setBaseLv] = useState(0);
  const [refineHistory, setRefineHistory] = useState([]);
  const [isAutoIncrementLv, setAutoIncrementLv] = useState(true);
  const [countSuccess, setCountSuccess] = useState(0);
  const [countFail, setCountFail] = useState(0);
  const [countDowngrade, setCountDowngrade] = useState(0);
  const [countDamage, setCountDamage] = useState(0);

  function simulateRefine(e) {
    if (e) {
      e.preventDefault();
    }

    let baseLvInt;
    try {
      baseLvInt = parseInt(baseLv)      
    } catch (error) {
      alert('base level is not valid integer')
      return;      
    }
    
    if (baseLvInt < 0 || baseLvInt >= 12) {
      alert('base level is not within range (0, 11)')
      return;
    }

    const result = refine(baseLvInt);

    let newLv;
    if (result == RefineResult.SUCCESS) {
      setCountSuccess(countSuccess + 1);
      newLv = baseLvInt + 1;
    } else if (result == RefineResult.FAIL) {
      setCountFail(countFail + 1);
      newLv = baseLvInt;
    } else if (result == RefineResult.DOWNGRADE) {
      setCountDowngrade(countDowngrade + 1);
      newLv = baseLvInt - 1;
    } else if (result == RefineResult.DAMAGE) {
      setCountDamage(countDamage + 1);
      newLv = baseLvInt;
    }

    if (isAutoIncrementLv) {
      setBaseLv(newLv.toString())
    }

    setRefineHistory(refineHistory.concat({
      result: result,
      baseLv: baseLvInt,
      newLv: newLv,
    }))
  }

  return (
    <div className="RefineApplication">
      <div className="row">
        <div className="col">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <h2>
              ROX Refinement Simulator
            </h2>
            <img src={RoxLogo} style={{ height: '50px' }} />
          </div>
          <p>
            Input the equipment base level in the input field. Then click `Refine` or press `enter` to simulate refinement.
            View the result on the table on the right.
          </p>
        </div>
      </div>
      
      <div className="row">

        <div className="col">
          <div className="refine-form">
            <form onSubmit={e => simulateRefine(e)}>
              <div className="input-row">
                <label>Base Lv : </label>
                <input type="number" value={baseLv} onChange={e => setBaseLv(e.target.value)} placeholder="Base Level" />
              </div>
              <div className="input-row">
                <label />
                <button type="submit">Refine</button>
              </div>
            </form>
          </div>

          <div className="refine-counter">
            <div>success: {countSuccess}</div>
            <div>fail: {countFail}</div>
            <div>downgrade: {countDowngrade}</div>
            <div>damaged: {countDamage}</div>
          </div>
        </div>

        <div className="col">
          <div className="refine-history-table">
            <table>
              <thead>
                <tr>
                  <th style={{ width: '20px' }}>#</th>
                  <th style={{ width: '200px' }}>Result</th>
                  <th style={{ width: '80px' }}>From Lv</th>
                  <th style={{ width: '80px' }}>To Lv</th>
                </tr>
              </thead>
              <tbody>
                {
                  refineHistory.map((h, index) => {
                    return (
                      <tr index={index}>
                        <td>{index}</td>
                        <td>{h.result}</td>
                        <td>{h.baseLv}</td>
                        <td>{h.newLv}</td>
                      </tr>
                    )
                  }).reverse()
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

export default RefineApplication;
