import { getCurrentDevice } from "../Middlewares/Middlewares";
import {useState} from "react";
import * as IMAGE from "./IMAGE";

export const currentDevice = {
    name: getCurrentDevice()
};

export const navList = [
    {
        name: "Ghi chú",
        alt: "note",
    },
    {
        name: "Lịch Trình",
        alt: "schedule"
    },
    {
        name: "Trang chủ",
        alt: "home"
    },
    {
        name: "Mục tiêu",
        alt: "goal"
    },
    {
        name: "Ngân sách",
        alt: "budget"
    }
]

export const listOfNavBar = {
    note: [
        {name: "Tạo mới", alt: "new", icon: "fa-solid fa-file-circle-plus"},
        {name: "Chỉnh sửa", alt: "edit", icon: "fa-sharp fa-solid fa-pen-to-square"},
        {name: "Lưu lại", alt: "save", icon: "fa-solid fa-floppy-disk"},
        {name: "Xóa bỏ", alt: "delete", icon: "fa-solid fa-trash"}
    ],
    schedule: [
        {name: "Tạo mới", alt: "new", icon: ""},
        {name: "Chỉnh sửa", alt: "edit", icon: ""},
        {name: "Lưu lại", alt: "save", icon: ""},
        {name: "Xóa bỏ", alt: "delete", icon: ""}
    ],
    home: [
        {name: "Tạo mới", alt: "new", icon: ""},
        {name: "Chỉnh sửa", alt: "edit", icon: ""},
        {name: "Lưu lại", alt: "save", icon: ""},
        {name: "Xóa bỏ", alt: "delete", icon: ""}
    ],
    goal: [
        {name: "Tạo mới", alt: "new", icon: ""},
        {name: "Chỉnh sửa", alt: "edit", icon: ""},
        {name: "Lưu lại", alt: "save", icon: ""},
        {name: "Xóa bỏ", alt: "delete", icon: ""}
    ],
    budget: [
        {name: "Tạo mới", alt: "new", icon: ""},
        {name: "Chỉnh sửa", alt: "edit", icon: ""},
        {name: "Lưu lại", alt: "save", icon: ""},
        {name: "Xóa bỏ", alt: "delete", icon: ""}
    ]
}
