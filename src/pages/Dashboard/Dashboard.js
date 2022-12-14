import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  getListAllDashboard,
  getDetailDashboardById,
  deleteDashboard,
} from "../../Axios/dashboardAxios";
// import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
const Dashboard = () => {
  const {
    getListDashboardResult,
    getListDashboardLoading,
    getListDashboardError,
    DeleteListDashboardResult,
  } = useSelector((state) => state.dashboardReducers);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getListAllDashboard());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getListAllDashboard(+id));
  }, [dispatch]);

  useEffect(() => {
    if (DeleteListDashboardResult) {
      // console.log("5. Masukk Component did update");
      dispatch(getListAllDashboard());
    }
  }, [DeleteListDashboardResult, dispatch]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h1
              className="activity-title"
              style={{
                position: "absolute",
                height: "54px",
                width: "145px",
                left: "220px",
                top: "148px",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "36px",
                lineHeight: "54px",
                /* identical to box height */

                color: "#111111",
              }}
            >
              {" "}
              Activity
            </h1>
          </div>
          <div className="col-6">
            <Link
              to="/AddActivity"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "13px 21px 13px 14px",
                gap: "6px",
                position: "absolute",
                width: "159px",
                height: "54px",
                left: "1061px",
                top: "154px",
                background: "#16ABF8",
                borderRadius: "45px",

                /* identical to box height */

                color: "#111111",
              }}
              type="button"
              className="btn btn-primary"
              data-cy="activity-add-button"
            >
              <AiOutlinePlus
                style={{
                  position: "absolute",
                  width: "24px",
                  height: "24px",
                  flex: "none",
                  left: "10px",
                  top: "12px",
                  order: "0",
                  color: "#FFFFFF",
                  flexGrow: "0",
                }}
              />
              <h5
                data-cy="Tambah"
                style={{
                  position: "absolute",
                  width: "78px",
                  height: "27px",
                  left: "40px",
                  top: "12px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "27px",
                  /* identical to box height */
                  textAlign: "center",
                  color: "#FFFFFF",
                  flex: "none",
                  order: "1",
                  flexGrow: "0",
                }}
              >
                {" "}
                Tambah
              </h5>
            </Link>
          </div>
        </div>

        <div className="row">
          {getListDashboardResult ? (
            getListDashboardResult.data.map((dashboard) => {
              return (
                <>
                  <div className="col-3">
                    <div
                      className="card"
                      style={{
                        height: "234px",
                        width: "235px",
                        left: "100px",
                        top: "170px",
                        background: "#FFFFFF",
                        boxShadow: " 0px 6px 10px rgba(0, 0, 0, 0.1)",
                        borderRadius: "12px",
                      }}
                    >
                      <div className="row">
                        <div className="col-4">
                          <div class="card-body">
                            <Link
                              to={`/item/detail/${dashboard.id}`}
                              onClick={() =>
                                dispatch(getDetailDashboardById(dashboard))
                              }
                              className="modal-add-title"
                              style={{
                                position: "absolute",
                                height: "27px",
                                width: "159px",
                                left: "30px",
                                top: "24px",
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: "600",
                                fontSize: "18px",
                                lineHeight: "27px",
                                /* identical to box height */

                                color: "#111111",
                              }}
                            >
                              {dashboard.title}
                            </Link>
                          </div>
                        </div>

                        <div className="col-4">
                          <h2
                            className="activity-item-date "
                            style={{
                              position: "absolute",
                              height: "21px",
                              width: "103 px",
                              left: "35px",
                              top: "200px",
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: "500",
                              fontSize: "14px",
                              lineHeight: "21px",
                              display: "flex",
                              alignItems: "center",

                              color: "#888888",
                              /* identical to box height */
                            }}
                          >
                            {dashboard.created_at}
                          </h2>
                        </div>

                        <div className="col-4">
                          <BsTrash
                            onClick={() =>
                              dispatch(deleteDashboard(dashboard.id))
                            }
                            style={{
                              display: "flex",
                              position: "absolute",
                              width: "14px",
                              height: " 14px",
                              left: "200px",
                              top: "200px",
                            }}
                            type="button"
                          ></BsTrash>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : getListDashboardLoading ? (
            <p>Loading...</p>
          ) : (
            <p>
              {getListDashboardError ? getListDashboardError : "Data Kosong"}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
