import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const AnnouncementCard = ({ announcement }) => {
  const [isShort, setIsShort] = useState(true);

  return (
    <div>
      <div className="my-10 bg-white border rounded shadow-md hover:shadow-2xl mx-auto duration-500">
        <div className="p-5">
          <div>
            <div className="flex items-center gap-4 my-4">
              <img
                className="w-10 h-10 object-cover rounded-full"
                src={announcement?.photoURL}
                alt="User"
              />
              <p className="text-2xl font-bold tracking-tight text-gray-900">
                {announcement?.name}
              </p>
            </div>
            <p className="font-bold tracking-tight text-gray-900 mb-2">
              {announcement?.title}
            </p>
            <div>
              {isShort ? (
                <div>
                  <p>
                    {announcement?.description?.slice(0, 130)}...{" "}
                    <Link
                      onClick={() => setIsShort(false)}
                      className="text-primary"
                    >
                      See More
                    </Link>
                  </p>
                </div>
              ) : (
                <p>{announcement?.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;

AnnouncementCard.propTypes = {
  announcement: PropTypes.object,
};
