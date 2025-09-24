import { BrowserRouter, Route, Routes } from "react-router-dom";
import { General } from "../components";
import {
  Client,
  Codes,
  Crew,
  CrewOrders,
  Dashboard,
  Feedback,
  Location,
  Login,
  Notification,
  OrderDetails,
  Orders,
  PinkDates,
  RolesAndRights,
  ServiceDetails,
  Services,
  TimeSlots,
  User,
  Offer,
  GlobalSettings,
  // Permissions,
} from "../screens";
import PrivateRoute from "./ProtectedRoute";

function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <General Component={Dashboard} />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <General Component={User} />
            </PrivateRoute>
          }
        />
        <Route
          path="/crew"
          element={
            <PrivateRoute>
              <General Component={Crew} />
            </PrivateRoute>
          }
        />
        <Route
          path="/roles"
          element={
            <PrivateRoute>
              <General Component={RolesAndRights} />
            </PrivateRoute>
          }
        />
        <Route
          path="/territories"
          element={
            <PrivateRoute>
              <General Component={Location} />
            </PrivateRoute>
          }
        />
        <Route
          path="/disable_timeslots"
          element={
            <PrivateRoute>
              <General Component={TimeSlots} />
            </PrivateRoute>
          }
        />
        <Route
          path="/territories/services"
          element={
            <PrivateRoute>
              <General Component={Services} />
            </PrivateRoute>
          }
        />
        <Route
          path="/territories/services/:id"
          element={
            <PrivateRoute>
              <General Component={ServiceDetails} />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <General Component={Orders} />
            </PrivateRoute>
          }
        />
        <Route
          path="/discount_codes"
          element={
            <PrivateRoute>
              <General Component={Codes} />
            </PrivateRoute>
          }
        />
        <Route
          path="/global-settings"
          element={
            <PrivateRoute>
              <General Component={GlobalSettings} />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders/details"
          element={
            <PrivateRoute>
              <General Component={OrderDetails} />
            </PrivateRoute>
          }
        />
        <Route
          path="/notification"
          element={
            <PrivateRoute>
              <General Component={Notification} />
            </PrivateRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <PrivateRoute>
              <General Component={Feedback} />
            </PrivateRoute>
          }
        />
        <Route
          path="/client"
          element={
            <PrivateRoute>
              <General Component={Client} />
            </PrivateRoute>
          }
        />
        <Route
          path="/offer"
          element={
            <PrivateRoute>
              <General Component={Offer} />
            </PrivateRoute>
          }
        />
        <Route
          path="/crew/orders"
          element={
            <PrivateRoute>
              <General Component={CrewOrders} />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/permissions"
          element={
            <PrivateRoute>
              <General Component={Permissions} />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/pink_dates"
          element={
            <PrivateRoute>
              <General Component={PinkDates} />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RootRouter;
