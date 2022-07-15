import { useEffect, useState } from "react";
function App() {

  const [info, setInfo] = useState([]);
  const [tempp, setTempp] = useState("fah");
  const [page, setPage] = useState(3);

  const handleTemp = e => setTempp(e.target.value);

  const pagination = () => {

  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40", {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      });

      if (res.status === 200) {
        const json = await res.json();
        setInfo(json.list);
      }
    }
    try {
      // setTimeout(() => {
      fetchData();
      // }, 2000); //set time for see the loading (just for)
    }
    catch (error) {
      console.log(error);
    }
  }, [])

  // c = (f - 32) * (5/9)
  // f = (c * 1.8) + 32

  return (
    <>
      {
        info.length !== 0 ?
          <div className="flex">
            <h1>Good Weather</h1>

            <div className="flex-switch">
              <span>
                <input type="radio" name="temp" value="cel" onChange={handleTemp} /> Cel
              </span>
              <span>
                <input type="radio" name="temp" value="fah" onChange={handleTemp} defaultChecked /> Fah
              </span>
            </div>

            <div className="arrwos">
              <div className="arrow-left">
                <i className="fa fa-arrow-left" onClick={pagination}></i>
              </div>
              <div className="arrow-right">
                <i className="fa fa-arrow-right" onClick={pagination}></i>

              </div>
            </div>

            <div className="weather-box">
              {
                info?.map((data, index) => {
                  return <div className="innerbox" key={index + 1} >
                    <div className="temp">
                      Temp: {tempp === "cel" ? parseInt((data.main.temp - 32) * (5 / 9)) + "°C" : data.main.temp + "°F"}
                    </div>
                    <div className="date">
                      Date: {new Date(data.dt_txt).toLocaleDateString()}
                    </div>
                    <div className="weather">
                      Weather: {data.weather[0].main}
                    </div>
                  </div>
                })

              }
            </div>
          </div>
          : <h1> Please wait, while we are fetching data for you.</h1>
      }

    </>
  );
}

export default App;
