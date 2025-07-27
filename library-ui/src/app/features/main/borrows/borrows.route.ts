import { Routes } from "@angular/router";
import { BorrowListComponent } from "../../../shared/components/borrow-list/borrow-list.component";

export const BORROWS_ROUTE: Routes = [
    {
        path: '',
        component: BorrowListComponent
    },
]