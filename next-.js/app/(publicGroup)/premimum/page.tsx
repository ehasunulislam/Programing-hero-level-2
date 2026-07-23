import React, { Suspense } from "react";
import { NewsSkeleton } from "../_components/news/NewsSkeleton";
import { PremiumNewsList } from "../_components/news/PremiumNewsList";

const premimumPage = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Premium News</h1>
          <p className="text-sm text-muted-foreground">
            Exclusive stories for our subscribers.
          </p>
        </div>
      </div>

      <Suspense fallback={<NewsSkeleton />}>
        <PremiumNewsList />
      </Suspense>
    </div>
  );
};

export default premimumPage;
