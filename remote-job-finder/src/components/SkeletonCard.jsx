import React from "react";

const SkeletonCard = () => (
  <div className="card p-5">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl skeleton" />
        <div className="space-y-2">
          <div className="w-24 h-3 rounded skeleton" />
          <div className="w-16 h-2.5 rounded skeleton" />
        </div>
      </div>
      <div className="w-16 h-3 rounded skeleton" />
    </div>
    <div className="w-3/4 h-4 rounded skeleton mb-3" />
    <div className="flex gap-2 mb-4">
      <div className="w-16 h-6 rounded-lg skeleton" />
      <div className="w-20 h-6 rounded-lg skeleton" />
      <div className="w-14 h-6 rounded-lg skeleton" />
    </div>
    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-dark-700">
      <div className="space-y-1">
        <div className="w-10 h-2.5 rounded skeleton" />
        <div className="w-24 h-4 rounded skeleton" />
      </div>
      <div className="w-24 h-9 rounded-xl skeleton" />
    </div>
  </div>
);

export default SkeletonCard;