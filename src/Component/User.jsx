import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
const User = () => {
  const param = useParams();
  const [user, setuser] = useState("");
  useEffect(() => {
    axios
      .get(`https://api-server-9wfz.onrender.com/api-user/${param.id}`)
      .then((res) => {
        if (res.data.success === true) {
          setuser(res.data.users);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex justify-center  items-center h-screen">
      <div className="w-[400px] h-[400px] bg-slate-100 rounded-xl font-Rampart">
        <p className="font-semibold text-xl text-center">User details</p>
        <div className="p-6">
          <p className="font-semibold">
            Name: <span>{user.firstName}</span>
          </p>
          <p className="font-semibold">
            Email: <span>{user.email}</span>
          </p>
          <p className="font-semibold">
            Gender: <span>{user.gender}</span>
          </p>
          <p className="font-semibold">
            Country: <span>{user.country}</span>
          </p>
          <p className="font-semibold">
            State: <span>{user.state}</span>
          </p>
          <p className="font-semibold">
            City: <span>{user.city}</span>
          </p>
          <p className="font-semibold">
            Age: <span>{user.age}</span>
          </p>
          <p className="font-semibold">
            Dateofbirth: <span>{user?.dateOfBirth?.substring(0, 16)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default User;
