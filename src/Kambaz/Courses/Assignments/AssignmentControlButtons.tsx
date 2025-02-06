import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";

export default function AssignmentControlButtons() {
  return (
    <div className="d-flex align-items-center float-end">
      <div className="wd-assignments-pill border border-dark rounded-pill px-2">
        40% of Total
      </div>
      <BsPlus className="fs-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}