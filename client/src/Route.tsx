import ErrorPage from "@pages/ErrorPage";
import MainLayout from "@pages/MainLayout";
import BudgetAdd from "@pages/budget/Budget.add";
import BudgetEdit from "@pages/budget/Budget.edit";
import BudgetIndex from "@pages/budget/Budget.index";
import ChartOfAccountsAdd from "@pages/chart_of_accounts/ChartOfAccounts.add";
import ChartOfAccountsEdit from "@pages/chart_of_accounts/ChartOfAccounts.edit";
import ChartOfAccountsIndex from "@pages/chart_of_accounts/ChartOfAccounts.index";
import DashboardIndex from "@pages/dashboard/Dashboard.index";
import EmployeesAdd from "@pages/employees/Employees.add";
import EmployeesEdit from "@pages/employees/Employees.edit";
import EmployeesIndex from "@pages/employees/Employees.index";
import ObligationRequestsAdd from "@pages/obligation_requests/ObligationRequests.add";
import ObligationRequestsEdit from "@pages/obligation_requests/ObligationRequests.edit";
import ObligationRequestsIndex from "@pages/obligation_requests/ObligationRequests.index";
import PapAdd from "@pages/pap/Pap.add";
import PapEdit from "@pages/pap/Pap.edit";
import PapIndex from "@pages/pap/Pap.index";
import SignatoriesAdd from "@pages/signatories/Signatories.add";
import SignatoriesEdit from "@pages/signatories/Signatories.edit";
import SignatoriesIndex from "@pages/signatories/Signatories.index";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <p>Login</p>,
    errorElement: <ErrorPage />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardIndex />,
      },
      {
        path: "/obligation-requests",
        element: <ObligationRequestsIndex />,
      },
      {
        path: "/obligation-requests/add",
        element: <ObligationRequestsAdd />,
      },
      {
        path: "/obligation-requests/:id/edit",
        element: <ObligationRequestsEdit />,
      },
      {
        path: "/employees",
        element: <EmployeesIndex />,
      },
      {
        path: "/employees/add",
        element: <EmployeesAdd />,
      },
      {
        path: "/employees/:id/edit",
        element: <EmployeesEdit />,
      },
      {
        path: "/budget",
        element: <BudgetIndex />,
      },
      {
        path: "/budget/add",
        element: <BudgetAdd />,
      },
      {
        path: "/budget/:id/edit",
        element: <BudgetEdit />,
      },
      {
        path: "/chart-of-accounts",
        element: <ChartOfAccountsIndex />,
      },
      {
        path: "/chart-of-accounts/add",
        element: <ChartOfAccountsAdd />,
      },
      {
        path: "/chart-of-accounts/:id/edit",
        element: <ChartOfAccountsEdit />,
      },
      {
        path: "/pap",
        element: <PapIndex />,
      },
      {
        path: "/pap/add",
        element: <PapAdd />,
      },
      {
        path: "/pap/:id/edit",
        element: <PapEdit />,
      },
      {
        path: "/signatories",
        element: <SignatoriesIndex />,
      },
      {
        path: "/signatories/add",
        element: <SignatoriesAdd />,
      },
      {
        path: "/signatories/:id/edit",
        element: <SignatoriesEdit />,
      },
      {
        path: "/settings",
        element: <h1>Settings</h1>,
      },
    ],
  },
]);
