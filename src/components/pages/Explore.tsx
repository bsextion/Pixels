import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import GridPostList from "../common/GridPostList";
import SearchResults from "../common/SearchResults";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import useDebounce from "../hooks/useDebounce";
import Loader from "../common/Loader";
import { useInView } from "react-intersection-observer";

const Explore = () => {
  const {ref, inView} = useInView()

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 600);

  const { data: searchedPosts, isFetching: isSearching } =
    useSearchPosts(debouncedValue);

    useEffect(() => {
      if (inView && !searchValue) {
        fetchNextPage();
      }
    }, [inView, searchValue]); //only call when last element is in view and we have search value

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts?.pages.every((item) => item.documents.length === 0);

  return (
    <div className="explore-container">
      {" "}
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full"> Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img src="/assets/icons/search.svg" width={24} height={24} />
          <Input
            type="text"
            placeholder="Search Posts"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h2 className="body-bold md:h3-bold">Trending</h2>
        <div className="flex-center gap-3 bg-dark rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2 ">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          ></img>
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults isSearchFetching={isSearching} searchedPosts={searchedPosts} />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">
            No more posts!
          </p>
        ) : (
          posts?.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>
      {hasNextPage && !searchValue && (
        // ref means we're at the bootom of page
        <div ref={ref} className="mt-10">
          <Loader/>
          </div>
      )}
    </div>
  );
};

export default Explore;
