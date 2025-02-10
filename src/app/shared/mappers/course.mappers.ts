import { Course, CourseDTO } from "@types";

export class CourseMapper {
  public static mapCourseDTO(courseDTO: CourseDTO): Course {
    return {
      id: courseDTO.id,
      href: courseDTO.href,
      name: courseDTO.name,
      title: courseDTO.title,
      programingLanguage: courseDTO.programingLanguage,
      description: courseDTO.description,
      lessons: [],
    }
  }
}
