import { getCurrentDevice } from "../Middlewares/Middlewares";

export const currentDevice = {
    name: getCurrentDevice()
};

export const navList = [
    {
        lang: [
            "Home",
            "Trang chủ"
        ],
        alt: "home",
        icon: "fa-solid fa-house-chimney"
    },
    {
        lang: [
            "Note",
            "Ghi chú"
        ],
        alt: "note",
        icon: "fa-solid fa-file-pen"
    },
    {
        lang: [
            "Schedule",
            "Lịch Trình"
        ], 
        alt: "schedule",
        icon: "fa-solid fa-calendar-days"
    },
    {
        lang: [
            "Budget",
            "Ngân sách"
        ],
        alt: "budget",
        icon: "fa-solid fa-wallet"
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
            'Lưu lại'
        ],
        icon: 'fa-solid fa-floppy-disk'
    },
    cancle: {
        lang: [
            'Cancel',
            'Hủy bỏ'
        ],
        icon: ''
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
