import Image from 'next/image';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

import { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Spin } from 'antd';

import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { RootState } from '../../redux/user';

import styles from '../../styles/post/index.module.scss';
import 'highlight.js/styles/vs2015.css';
import { publicRequest } from '../../../config';

interface PostType {
  _id: string;
  __v: number;
  updatedAt: string;
  title: string;
  text: string;
  imgUrl: string;
  createdAt: string;
  catName: string;
  author: string;
}

const PostPage = memo(({ ps }: { ps: PostType }) => {
  const [editBtnIndex, setEditBtnIndex] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector((state: RootState) => state.user);
  const Write = dynamic(() => import('../write'));
  const [onLoad, setOnLoad] = useState(false);

  useEffect(() => {
    document.querySelectorAll('.videoImgs').forEach((img) => img.setAttribute('style', ''));

    document.querySelectorAll('img').forEach((img) => img.setAttribute('crossOrigin', 'anonymous'));
  }, [editBtnIndex, id]);

  const inputText = () => {
    return { __html: `${ps?.text}` };
  };

  const deletePost = async () => {
    // 확인 다이얼로그 표시
    const userConfirmed = window.confirm('정말로 삭제하시겠습니까?');

    // 사용자가 확인을 선택한 경우에만 삭제 진행
    if (userConfirmed) {
      try {
        const res = await publicRequest.post(`/posts/${id}`, {
          user_id: user.id,
          editable: user.editable,
        });
        if (res.status === 204) {
          router.push('/');
        } else if (res.status === 401) {
          window.alert(`${res.statusText} This is a private Blog. Only the Admin can edit!!`);
        }
      } catch (err) {
        window.alert(err);
      }
    } else {
      window.alert('삭제가 취소되었습니다.');
    }
  };

  return (
    <>
      <Head>
        {/* SEO */}
        <title>{ps?.title}</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content={ps?.title} name="description" />
        <meta content={ps?.title} property="og:title" />
        <meta content={`https://lsevina126.netlify.app/ps/${ps?.title}/${ps?._id}`} property="og:url" />
        <meta content="website" property="og:type" />
        <meta content={ps?.title} property="og:site_name" />
        <meta content={ps?.imgUrl} property="og:image" />
        <meta content={ps?.title} property="og:description" />
        <link href={`https://lsevina126.netlify.app/ps/${ps?.title}/${ps?._id}`} rel="canonical" />
        {/* SEO */}
      </Head>
      {!editBtnIndex ? (
        <section className={styles.postPage}>
          {ps ? (
            <div className={styles.postBox}>
              <div className={styles.postImgTextBox}>
                <div
                  className={styles.postTitleImgBox}
                  style={onLoad ? { backgroundColor: '#e4e4e4' } : { backgroundColor: 'unset' }}
                >
                  <Image
                    alt=""
                    crossOrigin="anonymous"
                    fill
                    objectFit="contain"
                    onLoad={() => setOnLoad(true)}
                    quality={20}
                    src={`${ps.imgUrl}`}
                  />
                </div>
                {onLoad && (
                  <div className={styles.postTextBox}>
                    <header className={styles.postHeader}>
                      <p>
                        Category: <span>{ps.catName}</span>
                      </p>
                      <span>{ps.title}</span>
                      <div>
                        <EditFilled
                          onClick={() => {
                            if (!editBtnIndex) {
                              setEditBtnIndex(true);
                            } else {
                              setEditBtnIndex(false);
                            }
                          }}
                        />
                        <DeleteFilled onClick={deletePost} />
                      </div>
                    </header>
                    <div className={styles.authorAndDate}>
                      <p>
                        Author: <span>{ps.author}</span>
                      </p>
                      <span>{new Date(ps.createdAt).toDateString()}</span>
                    </div>
                    <div className="ql-snow">
                      <div className={`${styles.postContentText} ql-editor`} dangerouslySetInnerHTML={inputText()} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.circularBox}>
              <Spin />
            </div>
          )}
        </section>
      ) : (
        <Write post={ps} setEditBtnIndex={setEditBtnIndex} />
      )}
    </>
  );
});

export default PostPage;

export const getServerSideProps = async ({ params }: { params: { id: string } }) => {
  const res = await publicRequest.get(`/posts/${params.id}`);
  const ps = res.data;

  return {
    props: {
      ps,
    },
  };
};

// export const getStaticPaths = async () => {
//   const res = await fetch(`https://api.lsevina126.asia/posts`);
//   const posts = await res.json();

//   const paths = posts.map((post: any) => ({
//     params: {
//       id: post._id,
//     },
//   }));

//   return { paths, fallback: true };
// };

// export const getStaticProps = async ({ params }: any) => {
//   const id = params.id;
//   const res = await fetch(`https://api.lsevina126.asia/posts/${id}`);
//   const ps = await res.json();

//   return {
//     props: {
//       ps,
//     },
//   };
// };
