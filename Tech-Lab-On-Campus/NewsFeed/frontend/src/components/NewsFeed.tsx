import React from 'react';
import { Article } from '@/utils/types';
import NewsCard from './NewsCard';

interface NewsFeedProps {
    articles: Article[];
}

function NewsFeed({ articles }: NewsFeedProps) {
    // In case there are no articles yet
    if (articles.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No articles available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
                <div 
                    key={`${article.title}_${i}`}
                    className="transition-all duration-500 transform hover:-translate-y-1"
                >
                    <NewsCard article={article} />
                </div>
            ))}
        </div>
    );
}

export default NewsFeed;