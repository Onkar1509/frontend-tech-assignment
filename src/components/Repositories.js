//// This component have all logic related to search and filter repo.

import React, { useState, useEffect } from "react";
import { GoTriangleDown } from "react-icons/go";
import { BsCheck2 } from "react-icons/bs";
import { CgCloseR } from "react-icons/cg";
import Popup from "reactjs-popup";
import { InvokeGetServiceCall } from "../api/serviceUtil";
import apiConfig from "../api/apiConfig";
import moment from "moment";
import { ClipLoader } from "react-spinners";
function Repositories() {
  const [loading, setLoading] = useState(false);
  const [repoList, setRepoList] = useState([]);
  const [filteredRepoList, setFilteredRepoList] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [sortFilter, setSortFilter] = useState("Last Updated");
  const [filterSearchValue, setFilterSearchValue] = useState("");

  useEffect(() => {
    setLoading(true);
    InvokeGetServiceCall(apiConfig.GET_USER_REPOS)  //api call to get repositories
      .then((data) => {
        if (data.data.length > 0) {
          let sortedRepoData = data.data.sort(function (a, b) { //sorting by latest time
            return (
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
            );
          });
          setRepoList(sortedRepoData);
          setFilteredRepoList(sortedRepoData);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "Error Message");
        alert("Something Went Wrong");
      });
  }, []);

  useEffect(() => {
    handleFilter(); //calling filter function on state change
  }, [typeFilter, languageFilter, sortFilter, repoList]);

  function handleFilter() {
    let tempArr = [];
    repoList.forEach((item) => {
      switch (typeFilter) {  //switch have logic to filter repo by type
        case "Sources":
          if (item.fork === false) {
            tempArr.push(item);
          }
          break;
        case "Forks":
          if (item.fork === true) {
            tempArr.push(item);
          }
          break;
        case "Archived":
          if (item.archived === true) {
            tempArr.push(item);
          }
          break;
        case "Mirrors":
          if (item.archived === true) {
            tempArr.push(item);
          }
          break;
        case "Templates":
          if (item.archived === true) {
            tempArr.push(item);
          }
          break;
        default:
          tempArr.push(item);
          break;
      }
    });
    let tempArrOne = [];
    if (languageFilter !== "All") {  //this have logic to filter repo by language
      tempArr.forEach((item) => {
        if (item.language?.toLowerCase() === languageFilter.toLowerCase()) {
          tempArrOne.push(item);
        }
      });
    } else {
      tempArrOne = tempArr;
    }
    let tempArrTwo = [];
    if (sortFilter === "Last Updated") {  //switch have logic to sort repo by last update,name,stars.
      let sortedRepoData = tempArrOne.sort(function (a, b) {
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      });
      tempArrTwo = sortedRepoData;
    } else if (sortFilter === "Name") {
      let sortedRepoData = tempArrOne.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      tempArrTwo = sortedRepoData;
    } else {
      let sortedRepoData = tempArrOne.sort(function (a, b) {
        return b.stargazers_count - a.stargazers_count;
      });
      tempArrTwo = sortedRepoData;
    }

    setFilteredRepoList(tempArrTwo);
  }

  function clearFilter() {
    setTypeFilter("All");
    setLanguageFilter("All");
    setSortFilter("Last Updated");
  }

  return (
    <>
      {loading && (
        <div className="loaderIcon">
          <ClipLoader color="#0969da" />
        </div>
      )}
      <div className="repoSearch">
        <input
          type={"text"}
          placeholder="Find a repository..."
          value={filterSearchValue}
          onChange={(e) => {
            setFilterSearchValue(e.target.value);
          }}
        />
        <div>
          <Popup
            trigger={
              <button>
                Type <GoTriangleDown className="downIcon" />
              </button>
            }
            position="bottom right"
          >
            <div className="menuItemHeading">Select Type</div>
            <hr className="hrMargin" />
            <div
              onClick={() => {
                setTypeFilter("All");
              }}
              className="menu-item"
            >
              <span className="activeMenu">
                {typeFilter === "All" && <BsCheck2 />}
              </span>
              All
            </div>
            <hr className="hrMargin" />
            <div
              onClick={() => {
                setTypeFilter("Sources");
              }}
              className="menu-item"
            >
              <span className="activeMenu">
                {typeFilter === "Sources" && <BsCheck2 />}
              </span>
              Sources
            </div>
            <hr className="hrMargin" />
            <div
              onClick={() => {
                setTypeFilter("Forks");
              }}
              className="menu-item"
            >
              <span className="activeMenu">
                {typeFilter === "Forks" && <BsCheck2 />}
              </span>
              Forks
            </div>
            <hr className="hrMargin" />
            <div
              onClick={() => {
                setTypeFilter("Archived");
              }}
              className="menu-item"
            >
              <span className="activeMenu">
                {typeFilter === "Archived" && <BsCheck2 />}
              </span>
              Archived
            </div>
            <hr className="hrMargin" />
            <div
              onClick={() => {
                setTypeFilter("Mirrors");
              }}
              className="menu-item"
            >
              <span className="activeMenu">
                {typeFilter === "Mirrors" && <BsCheck2 />}
              </span>
              Mirrors
            </div>
            <hr className="hrMargin" />
            <div
              onClick={() => {
                setTypeFilter("Templates");
              }}
              className="menu-item"
            >
              <span className="activeMenu">
                {typeFilter === "Templates" && <BsCheck2 />}
              </span>
              Templates
            </div>
          </Popup>
          <Popup
            trigger={
              <button>
                Language <GoTriangleDown className="downIcon" />
              </button>
            }
            position="bottom right"
          >
            <div className="menuItemHeading">Select Language</div>
            <hr className="hrMargin" />
            <div
              onClick={() => {
                setLanguageFilter("All");
              }}
              className="menu-item"
            >
              <span className="activeMenu">
                {languageFilter === "All" && <BsCheck2 />}
              </span>
              All
            </div>
            <hr className="hrMargin" />
            <div
              onClick={() => {
                setLanguageFilter("JavaScript");
              }}
              className="menu-item"
            >
              <span className="activeMenu">
                {languageFilter === "JavaScript" && <BsCheck2 />}
              </span>
              JavaScript
            </div>
            <hr className="hrMargin" />
            <div
              onClick={() => {
                setLanguageFilter("PHP");
              }}
              className="menu-item"
            >
              <span className="activeMenu">
                {languageFilter === "PHP" && <BsCheck2 />}
              </span>
              PHP
            </div>
            <hr className="hrMargin" />
            <div
              onClick={() => {
                setLanguageFilter("HTML");
              }}
              className="menu-item"
            >
              <span className="activeMenu">
                {languageFilter === "HTML" && <BsCheck2 />}
              </span>
              HTML
            </div>
            <hr className="hrMargin" />
            <div
              onClick={() => {
                setLanguageFilter("TypeScript");
              }}
              className="menu-item"
            >
              <span className="activeMenu">
                {languageFilter === "TypeScript" && <BsCheck2 />}
              </span>
              TypeScript
            </div>
            <hr className="hrMargin" />
            <div
              onClick={() => {
                setLanguageFilter("Swift");
              }}
              className="menu-item"
            >
              <span className="activeMenu">
                {languageFilter === "Swift" && <BsCheck2 />}
              </span>
              Swift
            </div>
            <hr className="hrMargin" />
            <div
              onClick={() => {
                setLanguageFilter("CSS");
              }}
              className="menu-item"
            >
              <span className="activeMenu">
                {languageFilter === "CSS" && <BsCheck2 />}
              </span>
              CSS
            </div>
            <hr className="hrMargin" />
            <div
              onClick={() => {
                setLanguageFilter("Vue");
              }}
              className="menu-item"
            >
              <span className="activeMenu">
                {languageFilter === "Vue" && <BsCheck2 />}
              </span>
              Vue
            </div>
          </Popup>
          <Popup
            trigger={
              <button>
                Sort <GoTriangleDown className="downIcon" />
              </button>
            }
            position="bottom right"
          >
            <div className="menuItemHeading">Select Order</div>
            <hr className="hrMargin" />
            <div
              className="menu-item"
              onClick={() => {
                setSortFilter("Last Updated");
              }}
            >
              <span className="activeMenu">
                {sortFilter === "Last Updated" && <BsCheck2 />}
              </span>
              Last Updated
            </div>
            <hr className="hrMargin" />
            <div
              className="menu-item"
              onClick={() => {
                setSortFilter("Name");
              }}
            >
              <span className="activeMenu">
                {sortFilter === "Name" && <BsCheck2 />}
              </span>
              Name
            </div>
            <hr className="hrMargin" />
            <div
              className="menu-item"
              onClick={() => {
                setSortFilter("Stars");
              }}
            >
              <span className="activeMenu">
                {sortFilter === "Stars" && <BsCheck2 />}
              </span>
              Stars
            </div>
          </Popup>
        </div>
      </div>
      <hr />
      <div>
        <div className="filterDetailsMessage">
          <span>
            <strong>{filteredRepoList.length}</strong> results for{" "}
            <strong>{typeFilter}</strong> repositories{" "}
            {filterSearchValue && (
              <span>
                matching<strong> {filterSearchValue} </strong>
              </span>
            )}
            {languageFilter!=="All" && (
              <span>
                written in<strong> {languageFilter} </strong>
              </span>
            )}
            sorted by <strong>{sortFilter}</strong>
          </span>
          <span
            className="clearFilter"
            onClick={() => {
              clearFilter();
            }}
          >
            <CgCloseR className="clearFilterIcon" />
            Clear Filter
          </span>
        </div>
        <hr />
      </div>
      {filteredRepoList.map((item) => {
        return (
          item.name.toLowerCase().includes(filterSearchValue.toLowerCase()) && (
            <div key={item.id}>
              <span className="repoTitle">{item.name}</span>
              <button className="repoChipPublic">Public</button>
              <p className="repoPara">{item.description}</p>
              {item.topics.map((item, index) => {
                return (
                  <button key={index} className="chips">
                    {item}
                  </button>
                );
              })}
              <div style={{ marginTop: "10px" }}>
                <span className="repoSpan">{item.language}</span>
                <span className="repoSpan">{item.stargazers_count}</span>
                <span className="repoSpan">{item.license?.name}</span>
                <span className="repoSpan">
                  Updated on {moment(item.updated_at).local().format("ll")}
                </span>
              </div>
              <hr />
            </div>
          )
        );
      })}
    </>
  );
}

export default Repositories;
