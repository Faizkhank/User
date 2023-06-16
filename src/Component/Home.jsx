import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [age, setage] = useState();
  const [response, setresponse] = useState();
  const [Data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [userdata, setusedata] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => {
        const uniqueCountries = [
          ...new Set(res.data.map((city) => city.country)),
        ];
        setCountries(uniqueCountries);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const filteredStates = selectedCountry
    ? [
        ...new Set(
          Data.filter((city) => city.country === selectedCountry).map(
            (city) => city.subcountry
          )
        ),
      ]
    : [];

  const filteredCities = selectedState
    ? [
        ...new Set(
          Data.filter(
            (city) =>
              city.country === selectedCountry &&
              city.subcountry === selectedState
          ).map((city) => city.name)
        ),
      ]
    : [];
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setusedata({ ...userdata, country: country });
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setusedata({ ...userdata, state: state });
    setSelectedState(state);
    setSelectedCity("");
  };

  const handleInput = (e) => {
    setusedata({ ...userdata, [e.target.name]: e.target.value });
  };
  const handleAge = async (dateOfBirth) => {
    var today = new Date();
    var userbirthDate = new Date(dateOfBirth);

    var userage = today.getFullYear() - userbirthDate.getFullYear();
    var monthDiff = today.getMonth() - userbirthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < userbirthDate.getDate())
    ) {
      userage--;
    }
    setage(userage);
    setusedata({ ...userdata, age: userage, dateOfBirth: dateOfBirth });
  };
  const handleSubmit = async () => {
    if (age > 14) {
      axios
        .post("https://api-server-9wfz.onrender.com/api-user/add", userdata)
        .then((res) => {
          setresponse(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      alert("user is under 14 are not allowed");
    }
  };
  const handleCityChange = (e) => {
    const city = e.target.value;
    setusedata({ ...userdata, city: city });

    setSelectedCity(city);
  };
  return (
    <div className="flex justify-center  items-center h-screen">
      <div className="w-[500px] h-auto font-Rampart">
        <div className="w-full bg-slate-200 p-2 rounded-lg h-full  shadow-lg">
          <label className="font-semibold text-md text-slate-500 py-3">
            First Name:
            <input
              type="text"
              name="first_name"
              className="w-full rounded-lg h-12 p-3"
              onChange={handleInput}
            />
          </label>

          <label className="font-semibold text-md text-slate-500 py-3">
            Last Name:
            <input
              type="text"
              className="w-full rounded-lg h-12 p-3"
              name="last_name"
              onChange={handleInput}
            />
          </label>

          <label className="font-semibold text-md text-slate-500 py-3">
            Email:
            <input
              type="email"
              className="w-full rounded-lg h-12 p-3"
              name="email"
              onChange={handleInput}
            />
          </label>
          <div className="p-3">
            <label className="mb-4">
              Country:
              <select value={selectedCountry} onChange={handleCountryChange}>
                <option value="">Select a country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>

            {selectedCountry && (
              <label className="mt-2">
                State:
                <select value={selectedState} onChange={handleStateChange}>
                  <option value="">Select a state</option>
                  {filteredStates.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {selectedState && (
              <label>
                City:
                <select value={selectedCity} onChange={handleCityChange}>
                  <option value="">Select a city</option>
                  {filteredCities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
          <div className="font-semibold text-md text-slate-500 flex">
            <h1>Gender</h1>
            <div className="my-5 rounded-lg flex">
              <label className="p-1">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleInput}
                />
                Male
              </label>
              <br />
              <label className="p-1">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleInput}
                />
                Female
              </label>
              <br />
              <label className="p-1">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  onChange={handleInput}
                />
                Other
              </label>
            </div>
          </div>
          <div className="flex w-full justify-around">
            <label className="w-[180px] px-2 ">
              Date of Birth:
              <input
                type="date"
                className="w-full rounded-lg h-12 p-3"
                name="dateOfBirth"
                onChange={(e) => {
                  handleInput(e);
                  handleAge(e.target.value);
                }}
              />
            </label>

            <label className="w-[70px]">
              Age:
              {age ? (
                <p className="bg-white rounded-lg py-3 text-center">{age}</p>
              ) : null}
            </label>
          </div>
          <div className=" flex justify-center">
            <button
              onClick={handleSubmit}
              className="py-2 px-4 mt-2 bg-black text-white rounded-2xl"
              type="submit"
            >
              Add User
            </button>
          </div>
        </div>
        {response ? (
          <div className="w-full h-[200px] rounded-lg shadow-lg p-3">
            <p className=" font-semibold">User database link</p>
            <Link
              to={`https://user-lake.vercel.app/user/${response.userId}`}
              className=" text-blue-400 overflow-hidden"
            >
              https://user-lake.vercel.app/user/{response.userId}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
