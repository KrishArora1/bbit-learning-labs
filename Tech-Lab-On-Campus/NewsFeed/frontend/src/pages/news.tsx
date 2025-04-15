import { useState, useEffect } from "react";
import { Article } from "@/utils/types";
import FeaturedNewsCard from "@/components/FeaturedNews";
import NewsFeed from "@/components/NewsFeed";
import NewsCard from "@/components/NewsCard";

// DUMMY DATA
import featureStoryJson from "../../public/test-data/test_feature.json";

// Define main story
let mainStory: Article = {
    title: featureStoryJson.thread.title,
    image_url: featureStoryJson.thread.main_image,
    body: featureStoryJson.text,
    author: featureStoryJson.author,
    url: featureStoryJson.url,
    publish_date: new Date(featureStoryJson.published)
};

export default function News() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const articlesResponse = await fetch('/api/news/get-newsfeed', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // Uncomment when API is ready
                 const featuredArticleResponse = await fetch('/api/news/get-featured-article', {
                     method: 'GET',
                     headers: {
                         'Content-Type': 'application/json',
                     },
                });

                const [articlesData, status] = await articlesResponse.json();
                const articlesData2 = await featuredArticleResponse.json();
                setArticles(articlesData);
                setFeaturedArticle(articlesData2);
            } catch (error) {
                console.error("Failed to fetch news data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, []);

    // Get trending articles for the sidebar
    const trendingArticles = articles.slice(-10);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Latest News</h1>
                <div className="h-1 w-24 bg-blue-600 rounded"></div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-10">
                        {/* Featured Article */}
                        <section className="mb-12">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Featured Story</h2>
                            <FeaturedNewsCard article={featuredArticle ?? mainStory} />
                        </section>

                        {/* News Feed */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Top Stories</h2>
                            <NewsFeed articles={articles} />
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="hidden lg:block">
                        <div className="bg-gray-50 p-4 rounded-lg sticky top-8">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Trending</h2>
                            <div className="flex flex-col gap-6">
                                {trendingArticles.map((article, i) => (
                                    <div key={`trending_${i}`} className={i > 0 ? "pt-4 border-t border-gray-200" : ""}>
                                        <NewsCard article={article} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}