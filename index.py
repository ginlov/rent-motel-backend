import re


desc = """
    Chính chủ cho thuê Căn hộ cao cấp Cầu Giấy full nội thất từ 25-28m2
    -Căn hộ Studio DT28m2 giá 5 triệu/tháng.
    - Căn hộ studio DT 25 m2 giá 4,5 - 4.8 triệu / tháng
    - Diện tích: 25-28m2, cửa sổ thoáng mát.
    - Nội thất sang trọng, thang máy hiện đại, điều hòa, nóng lạnh, tivi, tủ bếp, tủ quần áo, tủ lạnh, bếp từ, thiết bị vệ sinh cao cấp...
    - Khu căn hộ đa số là người đi làm, chuyên gia nước ngoài ở nên rất văn minh và yên tĩnh có bảo vệ 24/24. Rất phù hợp với các cặp vợ chồng mới cưới, và người đi làm trí thức, sinh viên ngoan...
    - Vị trí cách công viên Nghĩa Đô 500m, bảo tàng Dân Tộc Học.
    - Gần các trường Đại học như Sư phạm, báo chí, quốc gia, Điện lực, Giao Thông….
    - Cách đường Nguyễn Văn Huyên 150m
    Địa chỉ: số 98 Ngõ 3 Nguyễn Văn Huyên Cầu Giấy
"""

print(re.sub(' +', ' ', repr(desc)))
