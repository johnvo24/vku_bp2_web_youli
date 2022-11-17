-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 17, 2022 lúc 12:43 PM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `yoledb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bills`
--

CREATE TABLE `bills` (
  `bill_id` bigint(20) NOT NULL,
  `wallet_id` bigint(20) NOT NULL,
  `c_category_id` bigint(20) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `item_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `item_cost` double NOT NULL,
  `item_description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bill_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `category_id` bigint(20) NOT NULL,
  `category_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `custom_categories`
--

CREATE TABLE `custom_categories` (
  `category_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `category_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `goal`
--

CREATE TABLE `goal` (
  `goal_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `goal_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `goal_img` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `goal_description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `goal_deathline` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `priority` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `note`
--

CREATE TABLE `note` (
  `note_id` bigint(20) NOT NULL,
  `note_box_id` bigint(20) NOT NULL,
  `note_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `note_img` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `note_description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `note_link` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `priority` tinyint(1) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `note`
--

INSERT INTO `note` (`note_id`, `note_box_id`, `note_title`, `note_img`, `note_description`, `note_link`, `created_at`, `status`, `priority`) VALUES
(1, 1, 'Mua kem', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png', 'Mua kem vua an vua hoc', '', '2022-11-12 04:34:41', 0, 1),
(6, 1, 'Mua sách', 'https://i.pinimg.com/736x/79/3c/8a/793c8a6bcf07457129706f57062ab456.jpg', '', '', '2022-11-12 04:48:30', 0, 2),
(7, 3, 'Mua áo ấm', '', 'Chiếc áo màu đỏ + cam + vàng', '', '2022-11-14 17:35:08', 0, 1),
(8, 3, 'Mua quần dài', '', 'Chiếc quần màu đỏ + cam + vàng', '', '2022-11-14 17:35:25', 0, 2),
(9, 4, 'Đi phú quốc', '', 'Vui chơi thôi', '', '2022-11-14 17:38:25', 0, 1),
(10, 4, 'Ra Hà Nội', '', 'Tắm Hồ Gươm', '', '2022-11-14 17:38:50', 0, 2),
(11, 1, 'Học Tiếng Anh', '', 'Coi film', '', '2022-11-14 17:39:25', 1, 3),
(12, 1, 'Luyện nói', '', 'Nói nhiều hơn mỗi ngày', '', '2022-11-15 18:22:16', 0, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `note_box`
--

CREATE TABLE `note_box` (
  `note_box_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `note_box_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `note_box_description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `priority` tinyint(1) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `note_box`
--

INSERT INTO `note_box` (`note_box_id`, `user_id`, `note_box_title`, `note_box_description`, `created_at`, `updated_at`, `status`, `priority`) VALUES
(1, 1, 'Học tập', 'Mua dụng cụ học tập', '2022-11-12 04:32:14', '2022-10-14 02:18:20', 1, 1),
(3, 1, 'Mua sắm', 'Mua nhiều nhiều nhé chú em', '2022-11-13 09:59:02', '2022-10-17 00:16:35', 0, 1),
(4, 1, 'Du lịch', 'Đi du lịch nhiều nhiều nhé chú em', '2022-11-13 09:59:28', '2022-11-16 06:08:00', 1, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `step`
--

CREATE TABLE `step` (
  `step_id` bigint(20) NOT NULL,
  `goal_id` bigint(20) NOT NULL,
  `step_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `step_img` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `step_description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `step_link` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `step_death` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `priority` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `userpassword` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_biography` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `language` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`user_id`, `username`, `userpassword`, `display_name`, `user_avatar`, `user_email`, `user_phone`, `user_biography`, `created_at`, `language`) VALUES
(1, 'account1', '123456', 'Account 1', NULL, 'account1@gmail.com', NULL, NULL, '2022-11-12 04:30:45', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wallet`
--

CREATE TABLE `wallet` (
  `wallet_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `budget` double NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`bill_id`),
  ADD KEY `wallet_id_2` (`wallet_id`),
  ADD KEY `c_category_id_2` (`c_category_id`),
  ADD KEY `category_id_2` (`category_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Chỉ mục cho bảng `custom_categories`
--
ALTER TABLE `custom_categories`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `goal`
--
ALTER TABLE `goal`
  ADD PRIMARY KEY (`goal_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`note_id`),
  ADD KEY `note_box_id_4` (`note_box_id`);

--
-- Chỉ mục cho bảng `note_box`
--
ALTER TABLE `note_box`
  ADD PRIMARY KEY (`note_box_id`),
  ADD KEY `user_id_3` (`user_id`);

--
-- Chỉ mục cho bảng `step`
--
ALTER TABLE `step`
  ADD PRIMARY KEY (`step_id`),
  ADD KEY `goal_id_2` (`goal_id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `user_email` (`user_email`),
  ADD UNIQUE KEY `user_phone` (`user_phone`);

--
-- Chỉ mục cho bảng `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`wallet_id`),
  ADD KEY `user_id_2` (`user_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bills`
--
ALTER TABLE `bills`
  MODIFY `bill_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `custom_categories`
--
ALTER TABLE `custom_categories`
  MODIFY `category_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `goal`
--
ALTER TABLE `goal`
  MODIFY `goal_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `note`
--
ALTER TABLE `note`
  MODIFY `note_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `note_box`
--
ALTER TABLE `note_box`
  MODIFY `note_box_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `step`
--
ALTER TABLE `step`
  MODIFY `step_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `wallet`
--
ALTER TABLE `wallet`
  MODIFY `wallet_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`wallet_id`) REFERENCES `wallet` (`wallet_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bills_ibfk_2` FOREIGN KEY (`c_category_id`) REFERENCES `custom_categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bills_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `custom_categories`
--
ALTER TABLE `custom_categories`
  ADD CONSTRAINT `custom_categories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `goal`
--
ALTER TABLE `goal`
  ADD CONSTRAINT `goal_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `note_ibfk_1` FOREIGN KEY (`note_box_id`) REFERENCES `note_box` (`note_box_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `note_box`
--
ALTER TABLE `note_box`
  ADD CONSTRAINT `note_box_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `step`
--
ALTER TABLE `step`
  ADD CONSTRAINT `step_ibfk_1` FOREIGN KEY (`goal_id`) REFERENCES `goal` (`goal_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `wallet`
--
ALTER TABLE `wallet`
  ADD CONSTRAINT `wallet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
