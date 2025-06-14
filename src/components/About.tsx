import { useAdminSession } from '@/hook/useAdminSession'
import Link from 'next/link'
import React from 'react'
import { AnimationControls, motion } from 'framer-motion'
import Image from 'next/image'
import { AboutMe } from '@prisma/client'

interface AboutProps {
  aboutData: AboutMe,
  animate1: AnimationControls,
  animate2: AnimationControls
}
const About = ({aboutData , animate1, animate2}:AboutProps) => {
  const {isAdmin} = useAdminSession()
  return (
    <div>
      {/* edit 버튼 */}
      {isAdmin && (
        <div className="flex justify-end max-w-4xl mx-auto my-2">
          <Link
            href="/admin/about/edit"
            className="text-sm bg-rose-400 px-3 py-1 rounded-md text-white shadow hover:bg-rose-500"
          >
            Edit About
          </Link>
        </div>
      )}
      <div>
        <motion.div initial={{ opacity: 0 }} animate={animate1}>
          <div
            className="relative w-full aspect-[4/3] lg:aspect-video rounded-2xl 
        
        overflow-hidden"
          >
            <Image
              src="/main1.jpg"
              alt="main_image.jpg"
              fill
              className="object-cover grayscale"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]/80" /> */}
          </div>
          <p className="mt-4 mb-10 break-words">{aboutData.bio}</p>
        </motion.div>
        {/* 인터뷰 */}
        <motion.ul initial={{ opacity: 0, y: 20 }} animate={animate2}>
          <li className="bg-zinc-700 p-4 rounded-md mb-4">
            <h3 className="text-lg font-semibold mb-2">
              Q. 프론트엔드 개발을 시작한 계기?
            </h3>
            <p className="indent-2">
개발을 시작하게 된 계기는 <span className='bg-zinc-900 font-bold'>개인적인 불편함과 개선에 대한 욕구에서 비롯되었습니다. </span>
            </p>
            <p className="indent-2">
사용자로서 다양한 웹과 앱을 사용하면서, 불편한 점이나 아쉬운 기능들을 자주 느꼈고, '직접 만들어보고 싶다'는 생각으로 이어졌습니다.            </p>
            <p className="indent-2">
그 과정에서 자연스럽게 UI/UX의 중요성을 깨닫게 되었고, 프론트엔드 개발에 관심을 갖게 되었습니다.
            </p>
          </li>
          <li className="bg-zinc-700 p-4 rounded-md mb-4">
            <h3 className="text-lg font-semibold mb-2">
              Q. 프로젝트에서 가장 중요하게 보는 요소
            </h3>
            <p className="indent-2"> <span className='bg-zinc-900 font-bold'>첫째는 사용자 경험입니다.</span> 사용 중 거슬리거나 불편한 요소를 최대한 줄이고, 시각적인 몰입감이나 사용 편의성과 같은 긍정적인 경험을 확대하는 것을 우선시합니다.

            </p>
            <p className="indent-2"> <span className='bg-zinc-900 font-bold'>둘째는 유지보수와 협업 효율성입니다.</span> 기능 추가나 확장이 필요할 때를 대비해 처음부터 구조를 유연하게 설계하고, 로직 흐름이나 코드의 명확성을 유지하려고 노력합니다.

            </p>
            <p className="indent-2">
이를 통해 혼자 작업할 때는 물론, 협업 시에도 원활하게 진행될 수 있도록 하는 것이 중요하다고 생각합니다.
            </p>
          </li>
          <li className="bg-zinc-700 p-4 rounded-md mb-4">
            <h3 className="text-lg font-semibold mb-2">
              Q. 새로운 기술을 익히는 방식
            </h3>
            <p className="indent-2 bg-zinc-900 font-bold inline">
새로운 기술은 필요한 만큼, 필요한 시점에 익히는 방식으로 접근하고 있습니다.
            </p>
            <p className="indent-2">
처음에는 개념과 사용법을 빠르게 익히고, 이후에는 실전 프로젝트를 통해 몸으로 체득하는 것을 선호합니다.
            </p>
            <p className="indent-2">
추가 학습이 필요하다고 느껴질 때마다 그때그때 보완하며 익히는 유연한 방식으로 학습하고 있습니다.            </p>
          </li>
        </motion.ul>
      </div>
    </div>
  )
}

export default About