import { getCurrentDevice } from "../Middlewares/Middlewares";
import {useState} from "react";
import * as IMAGE from "./IMAGE";

export const currentDevice = {
    name: getCurrentDevice()
};

export const navList = [
    {
        name: "Ghi chú",
        alt: "note"
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
    view: {
        lang: [
            'view',
            'Xem tất cả'
        ],
        icon: 'fa-solid fa-clipboard'
    },
    new: {
        lang: [
            'new',
            'Tạo mới'
        ],
        icon: 'fa-solid fa-file-circle-plus'
    },
    edit: {
        lang: [
            'edit',
            'Chỉnh sửa'
        ],
        icon: 'fa-sharp fa-solid fa-pen-to-square'
    },
    save: {
        lang: [
            'save',
            'Lưu'
        ],
        icon: 'fa-solid fa-floppy-disk'
    },
    delete: {
        lang: [
            'delete',
            'Xóa bỏ'
        ],
        icon: 'fa-solid fa-trash'
    },
    clean: {
        lang: [
            'clean',
            'Dọn dẹp'
        ],
        icon: 'fa-solid fa-trash-arrow-up'
    },
    chooseFile: {
        lang: [
            'Choose an image file',
            'Chọn tệp ảnh'
        ],
        icon: 'fa-solid fa-image'
    },
    yes: {
        lang: [
            'Yes',
            'Có'
        ]
    },
    no: {
        lang: [
            'No',
            'Không'
        ]
    }
}

export const SYSTEM_CATEGORY = [
    'market',
    'salary',
    'monthly home fee'
]

export const defaultAvatar = 'e23fd0380eea0512487d261d83354c68'
