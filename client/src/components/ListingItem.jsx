import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import PropTypes from "prop-types";

export default function ListingItem({ listing }) {
  return (
    <div className="item-card my-2 bg-[#f1efef] text-black  shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full md:w-[330px] ">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://www.realsimple.com/thmb/FUOyuPhMiyR-FskQKOf6Hsy2W_8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/winterize-house-GettyImages-1290088938-974f04d25e654a7482c13eb96f478247.jpg"
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 pb-5 w-full">
          <div className="flex items-center justify-between">
            <p className="">
              $
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <div className=" flex gap-1">
              <div className=" text-xs">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds /`
                  : `${listing.bedrooms} bed /`}
              </div>
              <div className="text-xs">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </div>
            </div>
          </div>
          <p className="truncate text-lg tracking-wide font-semibold ">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="text-sm /90 truncate w-full">{listing.address}</p>
          </div>
          <p className="text-sm /90 line-clamp-2">{listing.description}</p>
        </div>
      </Link>
    </div>
  );
}

ListingItem.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    offer: PropTypes.bool.isRequired,
    discountPrice: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["rent", "sale"]).isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};
