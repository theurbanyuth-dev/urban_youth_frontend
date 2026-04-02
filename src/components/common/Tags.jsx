import React from "react";

const Tags = ({ product }) => {
  return (
    <>
      {product?.tag && product?.tag.length !== 0 && (
        <div className="flex flex-row">
          {JSON.parse(product?.tag).map((t, i) => (
            <span
              key={i + 1}
              className="bg-[#2a7dad] px-2 py-1 mr-2 border-0 text-[#eef4ff] rounded inline-flex items-center justify-center text-xs mt-1.5"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default Tags;
