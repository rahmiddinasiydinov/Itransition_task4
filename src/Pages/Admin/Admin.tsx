import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import './Admin.scss';
import { Iuser } from '../../Helpers/interfaces';
import dateFormat from 'dateformat';
export const Admin: React.FC = () => {
  const [users, setUsers] = useState<Iuser[] | undefined>(undefined); 
  const [allData, setAlldata] = useState<Iuser[] | undefined>(undefined); 
  const [ownUsername, setOwnUsername] = useState<string>('')
  const [selected, setSelected] = useState<string[]>([]); 
  const [toggle, setToggle] = useState<boolean>(false); 
  const [selectText, setSelectText] = useState<string>('Select All');
  const { token } = useParams();
    const navigate = useNavigate()
  useEffect(() => {
        axios
          .get("https://regauth1.herokuapp.com/user", {
            headers: {
              token: `${token}`,
            },
          })
          .then((res) => {
            setUsers(res.data.users);
            setAlldata(res.data.users);
            setOwnUsername(res.data.username);
          });
    selected.length===users?.length?setSelectText('Remove All'):setSelectText("Sellect all")
    
    }, [token, selected, toggle])
    
    const handleChange = (e:any) => {
        const id = e.target.value
        if (selected?.includes(id)) {
           setSelected([...selected.filter((e: string) => e !== id)]);
           
        } else {
          setSelected([...selected, id])
        }
    }
  const handleClick = () => {
    if (selected.length === users?.length) {
      setSelected([]);

    } else {
      const arr = new Set<string>(users?.map(e => e._id));
      setSelected([...Array.from(arr)])      
    }
  }
  const handleDelete = () => {
    axios.delete(`https://regauth1.herokuapp.com/user?arrId=${selected}`, {
      headers: {
      "token":`${token}`
    }}).then((res) => {
      if (res.data.status === 200) {
          setToggle(!toggle);
      } else if (res.data.status === 401) {
        alert("token is invalid");
        navigate("/");
      } else if (res.data.status === 400) {
        alert(res.data.message);
        navigate('/')
      }
    });
  }
  const handleBlock = () => {
     axios
       .put(`https://regauth1.herokuapp.com/user`,
         {
           arrId: selected,
         status:false},
         {
           headers: {
           "token":`${token}`
         }}
       )
       .then((res) => {
         if (res.data.status === 200) {
             setToggle(!toggle);
         } else if (res.data.status === 401) {
           alert('token is invalid');
           navigate('/');
         } else if (res.data.status === 400) {
           alert(res.data.message)
           navigate('/')
         }
       });
  }
    const handleUnBlock = () => {
      axios
        .put(
          `https://regauth1.herokuapp.com/user`,
          {
            arrId: selected,
            status: true,
          },
          {
            headers: {
              token: `${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.status === 200) {
              setToggle(!toggle);
          } else if (res.data.status === 401) {
            alert("token is invalid");
            navigate("/");
          } else if (res.data.status === 400) {
            alert(res.data.message);
            navigate("/");
          }
        });
    };
  const handleSearch = (e:any) => {
    const value = e.target.value.trim();
    const reg = new RegExp(value, 'gi');
    const data: Iuser[] | undefined = allData?.filter((e: Iuser) => e.username.match(reg));
    setUsers(data ? [...data] : users);
   }
    
    return (
      <div className="admin">
        <header className="admin__header">
          <div className="container-md admin__header--wrapper">
            <span className="admin__header--logo">AdminPanel</span>

            <div className="input-group mb-3 admin__header--form">
              <input
                type="text"
                className="form-control"
                placeholder="username"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                onChange={handleSearch}
              />
              <button
                className="btn btn-primary admin__header--search"
                type="submit"
                id="button-addon2"
              >
                Search
              </button>
            </div>
            <div
              className="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button
                type="button"
                onClick={handleBlock}
                className="btn btn-danger"
              >
                Block
              </button>
              <button
                type="button"
                onClick={handleUnBlock}
                className="btn btn-success"
              >
                <i className="fa-solid fa-lock-open"></i>
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-warning admin__trash"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline-primary admin__header--logout"
            onClick={() => {
              navigate("/");
            }}
          >
            Log out
          </button>
        </header>
        <main className="admin__main">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                  <button
                    type="button"
                    onClick={handleClick}
                    className="admin__main--select"
                  >
                    {selectText}
                  </button>
                </th>
                <th>№</th>
                <th>Id</th>
                <th>Full Name</th>
                <th>Username</th>
                <th>Password</th>
                <th>Email</th>
                <th>Last login time</th>
                <th>Registration time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((e: Iuser, i: number) => {
                return (
                  <tr key={i}>
                    <td className="admin__main--check">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          value={e._id}
                          onChange={handleChange}
                          checked={selected.includes(e._id)}
                        />
                      </div>
                    </td>
                    <td>{i + 1}</td>
                    <td>{e._id}</td>
                    <td>
                      {e.fullName}
                      {e.username === ownUsername ? (
                        <span className="admin__himself"> this is you</span>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>{e.username}</td>
                    <td>{e.password}</td>
                    <td>{e.email}</td>
                    <td>
                      {dateFormat(e.lastLogin, " mmmm dS, yyyy, h:MM TT")}
                    </td>
                    <td>
                      {dateFormat(
                        e.registrationDate,
                        " mmmm dS, yyyy, h:MM TT"
                      )}
                    </td>
                    <td className={`${e.status ? "active" : "block"}`}>
                      {e.status ? "Active" : "Blocked"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </main>
      </div>
    );
    }